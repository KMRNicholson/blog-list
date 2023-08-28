module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'linebreak-style': [
      'error',
      'windows'
    ],
    semi: [
      'error',
      'never'
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'arrow-parens': [
      'error',
      'as-needed'
    ],
    'no-console': 0
  }
}
