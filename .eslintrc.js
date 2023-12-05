module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  parser: '@babel/eslint-parser',
  extends: ['airbnb-base', 'prettier', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['test/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: { 'jest/prefer-expect-assertions': 'off' },
    },
  ],
  rules: {
    indent: ['error', 2],
  },
  plugins: ['jest'],
};
