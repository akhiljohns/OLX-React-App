module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest', // Use the specific ECMAScript version
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // Set all possible ESLint rules to warnings

    // Possible ESLint warnings
    'accessor-pairs': 'warn',
    'array-bracket-newline': 'warn',
    'array-bracket-spacing': 'warn',
    'array-callback-return': 'warn',
    'array-element-newline': 'warn',
    'arrow-body-style': 'warn',
    // ... Add more rules here ...

    // React plugin rules as warnings
    'react/boolean-prop-naming': 'warn',
    'react/button-has-type': 'warn',
    'react/default-props-match-prop-types': 'warn',
    // ... Add more React rules here ...
  },
};
