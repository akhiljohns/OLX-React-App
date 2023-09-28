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
    ecmaVersion:  'latest', // Use the specific ECMAScript version
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // Add or modify rules as needed based on the warnings you want to address

    // Treat "jsx-a11y/img-redundant-alt" as a warning
    'jsx-a11y/img-redundant-alt': 'warn',

    // Treat "react-hooks/exhaustive-deps" as a warning
    'react-hooks/exhaustive-deps': 'warn',

    // Treat "no-unused-vars" as a warning
    'no-unused-vars': 'warn',
  },
};
