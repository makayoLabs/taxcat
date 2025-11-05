module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
      allowDirectConstAssertionInArrowFunctions: true,
      allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      allowFunctionsWithoutTypeParameters: true,
      allowedNames: ['Page', 'Layout', 'Loading', 'Error', 'NotFound'],
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    }],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-alert': 'warn',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'warn',
    '@next/next/no-html-link-for-pages': 'warn',
  },
  ignorePatterns: ['dist/**/*', 'node_modules/**/*', '.next/**/*'],
}; 