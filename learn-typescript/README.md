# Learn TypeScript

## TypeScript setup

```bash
npm init -y
npm i typescript ts-node
npx tsx --init
eslint --init

npm i --save-dev typescript @typescript-eslint/parser
npm i --save-dev @typescript-eslint/eslint-plugin
```

## eslint config

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2], // 2 spaces === 1 tab
    '@typescript-eslint/arrow-body-style': 'off',
    '@typescript-eslint/no-console': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
```
