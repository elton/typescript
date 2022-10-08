/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: { 'vue/multi-word-component-names': 'off' },
  globals: {
    uni: true,
    UniApp: true,
    wx: true,
    ICloud: true,
  },
  parser: 'vue-eslint-parser',
};
