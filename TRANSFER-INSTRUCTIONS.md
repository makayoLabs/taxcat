# File Transfer Instructions for Windows to Unraid

## Method 1: SCP (Recommended)
1. Open PowerShell as Administrator
2. Navigate to your project directory
3. Run the following command:

scp -r . root@192.168.2.125:/mnt/user/apps/taxcat-app/

## Method 2: SMB Share
1. Open File Explorer
2. Navigate to: \\192.168.2.125\apps\
3. Create folder: taxcat-app
4. Copy all project files to this folder

## Method 3: WinSCP (GUI)
1. Download and install WinSCP
2. Connect to: 192.168.2.125 as root
3. Navigate to: /mnt/user/apps/
4. Create folder: taxcat-app
5. Upload all project files

## After Transfer
1. SSH into Unraid: ssh root@192.168.2.125
2. Navigate to: cd /mnt/user/apps/taxcat-app
3. Run: chmod +x scripts/deploy-unraid.sh
4. Run: ./scripts/deploy-unraid.sh
