module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['./node_modules/gts'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
