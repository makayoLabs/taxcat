#!/bin/bash

# Script to copy TaxCat repository files to Financial Freedom Pathway repository
# This preserves existing files in the target repository (merge mode)

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}TaxCat to Financial Freedom Pathway${NC}"
echo -e "${BLUE}File Copy Script (Merge Mode)${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if target directory is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: $0 <path-to-financial-freedom-pathway-repo>${NC}"
    echo ""
    echo "Example:"
    echo "  $0 /home/user/financial-freedom-pathway"
    echo ""
    echo "Or if both repos are in the same parent directory:"
    echo "  $0 ../financial-freedom-pathway"
    exit 1
fi

TARGET_DIR="$1"

# Check if target directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${YELLOW}Error: Target directory does not exist: $TARGET_DIR${NC}"
    echo ""
    echo "Please clone the financial-freedom-pathway repository first:"
    echo "  git clone https://github.com/makayoLabs/financial-freedom-pathway.git"
    exit 1
fi

# Check if target is a git repository
if [ ! -d "$TARGET_DIR/.git" ]; then
    echo -e "${YELLOW}Warning: Target directory is not a git repository${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

SOURCE_DIR="/home/user/taxcat"

echo -e "${GREEN}Source:${NC} $SOURCE_DIR"
echo -e "${GREEN}Target:${NC} $TARGET_DIR"
echo ""

# Get current directory
CURRENT_DIR=$(pwd)

# Change to source directory
cd "$SOURCE_DIR"

echo -e "${BLUE}Copying files (merge mode - preserving existing files)...${NC}"
echo ""

# Copy files and directories, preserving existing files
# Using rsync for better control over the merge
if command -v rsync &> /dev/null; then
    echo "Using rsync for intelligent merge..."
    rsync -av --ignore-existing \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='.next' \
        --exclude='dist' \
        --exclude='build' \
        --exclude='.env' \
        --exclude='.env.local' \
        --exclude='TaxCat-Complete.zip' \
        --exclude='TaxCat-Project.zip' \
        . "$TARGET_DIR/"
else
    echo "rsync not found, using cp..."
    # Fallback to cp with exclusions
    find . -maxdepth 1 -type f -not -name '*.zip' -not -name '.env' -not -name '.env.local' -exec cp -n {} "$TARGET_DIR/" \;

    # Copy directories (excluding common build/dependency directories)
    for dir in src public docs scripts prisma nginx ekbooks ekbooks-website shared-design-system taxcat; do
        if [ -d "$dir" ]; then
            echo "Copying directory: $dir"
            mkdir -p "$TARGET_DIR/$dir"
            cp -rn "$dir/"* "$TARGET_DIR/$dir/" 2>/dev/null || true
        fi
    done
fi

echo ""
echo -e "${GREEN}✓ Copy completed!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. cd $TARGET_DIR"
echo "2. git status  # Review what was added"
echo "3. git add .   # Stage all new files"
echo "4. git commit -m \"Merge TaxCat repository files\""
echo "5. git push"
echo ""
echo -e "${YELLOW}Note:${NC} Existing files in financial-freedom-pathway were preserved (not overwritten)"
