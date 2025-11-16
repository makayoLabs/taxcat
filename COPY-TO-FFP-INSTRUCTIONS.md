# Copy TaxCat to Financial Freedom Pathway - Instructions

This guide explains how to merge the TaxCat repository into the Financial Freedom Pathway repository while preserving existing files.

## Prerequisites

1. You need to have both repositories on your local machine
2. Git must be installed
3. You should have write access to the financial-freedom-pathway repository

## Method 1: Using the Automated Script (Recommended)

### Step 1: Clone the Financial Freedom Pathway repository

```bash
cd /home/user
git clone https://github.com/makayoLabs/financial-freedom-pathway.git
```

### Step 2: Run the copy script

From the taxcat directory:

```bash
cd /home/user/taxcat
./copy-to-ffp.sh /home/user/financial-freedom-pathway
```

Or if you're in a different location:

```bash
/home/user/taxcat/copy-to-ffp.sh /path/to/your/financial-freedom-pathway
```

### Step 3: Review and commit

```bash
cd /home/user/financial-freedom-pathway
git status                                    # See what was added
git add .                                     # Stage all new files
git commit -m "Merge TaxCat repository files"
git push origin main                          # Or your default branch
```

## Method 2: Manual Copy (Alternative)

If you prefer to copy files manually:

### Step 1: Clone both repositories

```bash
cd /home/user
git clone https://github.com/makayoLabs/financial-freedom-pathway.git
```

### Step 2: Copy files using rsync (preserves existing files)

```bash
rsync -av --ignore-existing \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='TaxCat-Complete.zip' \
    /home/user/taxcat/ \
    /home/user/financial-freedom-pathway/
```

### Step 3: Review and commit

```bash
cd /home/user/financial-freedom-pathway
git status
git add .
git commit -m "Merge TaxCat repository files"
git push origin main
```

## What Gets Copied?

### Directories:
- `src/` - All source code
- `public/` - Public assets
- `docs/` - Documentation
- `scripts/` - Build and deployment scripts
- `prisma/` - Database schemas
- `nginx/` - Web server configuration
- `ekbooks/` and `ekbooks-website/` - Related projects
- `shared-design-system/` - Design system components
- `taxcat/` - TaxCat specific files

### Files:
- All markdown documentation (README.md, guides, etc.)
- Configuration files (.eslintrc, prettier, etc.)
- Docker files and docker-compose configurations
- Package.json and dependencies
- Next.js configuration
- Deployment scripts
- And more...

### What's Excluded:
- `.git/` directory (preserves FFP's git history)
- `node_modules/` (should be reinstalled)
- `.next/` and `build/` directories
- `.env` files (these are environment-specific)
- Large zip files
- Build artifacts

## Important Notes

1. **Merge Mode**: The script uses `--ignore-existing` which means:
   - If a file exists in FFP, it will NOT be overwritten
   - Only new files from TaxCat will be added
   - Your existing FFP files are safe

2. **After Copying**: You may need to:
   - Run `npm install` to install dependencies
   - Update environment variables in `.env` files
   - Resolve any configuration conflicts
   - Test the application

3. **Conflicts**: If there are naming conflicts or files that should be merged manually, you'll need to handle those separately

## Troubleshooting

### Permission Denied
```bash
chmod +x /home/user/taxcat/copy-to-ffp.sh
```

### Target Directory Not Found
Make sure you've cloned the financial-freedom-pathway repository first

### rsync Not Available
The script will fall back to using `cp` command automatically

## Support

If you encounter issues, check:
- Both repositories are cloned correctly
- You have write permissions
- Git is properly configured
- All paths are correct
