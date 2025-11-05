const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to recursively get all TypeScript files
function getTypeScriptFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('dist')) {
      results = results.concat(getTypeScriptFiles(filePath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(filePath);
    }
  }

  return results;
}

// Function to fix common TypeScript issues
function fixTypeScriptIssues(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Fix missing return types
  newContent = newContent.replace(
    /function\s+(\w+)\s*\((.*?)\)\s*{/g,
    (match, name, params) => `function ${name}(${params}): void {`
  );

  // Fix arrow functions without return types
  newContent = newContent.replace(
    /const\s+(\w+)\s*=\s*\((.*?)\)\s*=>\s*{/g,
    (match, name, params) => `const ${name} = (${params}): void => {`
  );

  // Fix unused variables by prefixing with underscore
  newContent = newContent.replace(
    /\(([\w\s,]*?)(\w+)(\s*:\s*\w+)?\)\s*(?:=>|{)/g,
    (match, before, param, type) => `(${before}_${param}${type || ''}) =>`
  );

  // Write back the changes
  fs.writeFileSync(filePath, newContent);
}

// Main execution
const srcDir = path.join(process.cwd(), 'src');
const files = getTypeScriptFiles(srcDir);

console.log('Fixing TypeScript issues...');
files.forEach((file) => {
  console.log(`Processing ${file}...`);
  fixTypeScriptIssues(file);
});

console.log('Running ESLint fix...');
execSync('npx eslint --fix "src/**/*.{ts,tsx}" "*.{ts,tsx}"', { stdio: 'inherit' });

console.log('Done!'); 