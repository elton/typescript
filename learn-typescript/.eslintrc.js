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
    'arrow-body-style': 'off',
    'no-console': 'off',
    'comma-dangle': 'off',
    'no-unused-vars': 'warn',
  },
};
