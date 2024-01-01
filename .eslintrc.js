module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard',
    'standard-jsx'
  ],
  ignorePatterns: [
    'node_modules/',
    '.next/'
  ],
  overrides: [
    {
      files: ['src/**/*.test.*'],
      extends: [
        'plugin:jest/recommended'
      ]
    }
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src'
        },
        extensions: ['.js', '.jsx']
      }
    }
  },
  rules: {
    'react/react-in-jsx-scope': 0
  }
}
