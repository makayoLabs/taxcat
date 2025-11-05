#!/usr/bin/env node

/**
 * Script to fix common TypeScript syntax errors in TaxCat
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Common syntax error patterns and their fixes
const fixes = [
  // Function return types
  {
    pattern: /export async function (POST|GET|PUT|DELETE|PATCH)\([^)]*\): void \{/g,
    replacement: 'export async function $1: Promise<NextResponse> {'
  },
  
  // Catch block syntax errors
  {
    pattern: /catch \(__(error|err)\) =>(?:\s*\n\s*)(console\.error\([^)]+\);\s*return[^}]+)/gms,
    replacement: 'catch ($1) {\n    $2\n  }'
  },
  
  // Return type errors in components
  {
    pattern: /const (\w+) = \(\): void => \{/g,
    replacement: 'const $1 = (): JSX.Element => {'
  },
  
  // Arrow function syntax errors
  {
    pattern: /catch \(\s*__(error|err)\s*\)\s*=>/g,
    replacement: 'catch ($1) {'
  },
  
  // Variable naming errors (prefixing with __)
  {
    pattern: /\b__(existingUser|existingSession|existingDocument|existingTaxReturn|existingDependent|existingDeduction|error|err|user|session|document|taxReturn|dependent|deduction)\b/g,
    replacement: '$1'
  },
  
  // Global declaration syntax
  {
    pattern: /declare global \(\s*(var\s+\w+:[^}]+)\s*\)/g,
    replacement: 'declare global {\n  // eslint-disable-next-line no-var\n  $1\n}'
  }
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    fixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

async function fixAllFiles() {
  console.log('🔧 Starting syntax error fixes...\n');
  
  // Patterns to match files that commonly have these errors
  const patterns = [
    'src/app/api/**/*.ts',
    'src/app/**/*.tsx', 
    'src/components/**/*.tsx',
    'src/lib/**/*.ts',
    'src/core/**/*.ts',
    'src/modules/**/*.ts',
    'src/services/**/*.ts',
    'src/hooks/**/*.ts',
    'src/config/**/*.ts'
  ];
  
  let totalFixed = 0;
  
  for (const pattern of patterns) {
    const files = await glob(pattern);
    files.forEach(file => {
      fixFile(file);
      totalFixed++;
    });
  }
  
  console.log(`\n🎉 Fixed syntax errors in ${totalFixed} files!`);
  console.log('\nRun the following to test the fixes:');
  console.log('npm run lint');
  console.log('npm run build');
}

// Create additional missing imports and fix unused imports
const importFixes = [
  // Add missing React imports
  {
    pattern: /^import React from 'react';$/m,
    replacement: (filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      if (!content.includes("import React from 'react'") && filePath.includes('.tsx')) {
        return "import React from 'react';\n" + content;
      }
      return content;
    }
  }
];

if (require.main === module) {
  fixAllFiles().catch(console.error);
}

module.exports = { fixFile, fixes };
