module.exports = {
  env: {
    'es6': true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: [
    'react'
  ],
  rules: {
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'eol-last': 'error',
    indent: ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    'no-const-assign': 'error',
    'no-multiple-empty-lines': 'error',
    'no-unused-vars': 'error',
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    // react
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/require-render-return': 'error',
    'react/jsx-indent': ['error', 2],
    'react/jsx-tag-spacing': 'error'
  }
};
