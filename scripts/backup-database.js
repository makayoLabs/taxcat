const AWS = require('aws-sdk');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const backupDatabase = async () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFileName = `taxcat-backup-${timestamp}.sql`;
  const backupPath = path.join(__dirname, '../backups', backupFileName);

  // Ensure backups directory exists
  if (!fs.existsSync(path.join(__dirname, '../backups'))) {
    fs.mkdirSync(path.join(__dirname, '../backups'));
  }

  try {
    // Create database backup
    await new Promise((resolve, reject) => {
      exec(
        `pg_dump -U ${process.env.DB_USER} -h ${process.env.DB_HOST} ${process.env.DB_NAME} > ${backupPath}`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(stdout);
        }
      );
    });

    // Upload to S3
    const fileStream = fs.createReadStream(backupPath);
    await s3.upload({
      Bucket: process.env.AWS_BACKUP_BUCKET,
      Key: `database-backups/${backupFileName}`,
      Body: fileStream,
    }).promise();

    console.log(`Backup completed successfully: ${backupFileName}`);

    // Clean up local backup
    fs.unlinkSync(backupPath);

    // Clean up old backups from S3 (keep last 30 days)
    const oldBackups = await s3.listObjects({
      Bucket: process.env.AWS_BACKUP_BUCKET,
      Prefix: 'database-backups/',
    }).promise();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    for (const obj of oldBackups.Contents) {
      if (new Date(obj.LastModified) < thirtyDaysAgo) {
        await s3.deleteObject({
          Bucket: process.env.AWS_BACKUP_BUCKET,
          Key: obj.Key,
        }).promise();
        console.log(`Deleted old backup: ${obj.Key}`);
      }
    }

  } catch (error) {
    console.error('Backup failed:', error);
    // Send notification about backup failure
    // TODO: Implement notification system
  }
};

// Schedule backup to run daily at 2 AM
cron.schedule('0 2 * * *', backupDatabase);

// Also export for manual execution
module.exports = backupDatabase;

// If running directly, execute backup
if (require.main === module) {
  backupDatabase(); 