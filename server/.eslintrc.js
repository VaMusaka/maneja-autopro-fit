module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": ["eslint:recommended", 'airbnb-base', 'prettier'],
    "parserOptions": {
        "ecmaVersion": 12
    },globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': ['warn'],
    'no-var': ['off'],
    'one-var': ['off'],
    'linebreak-style': ['error', 'unix']
  }
};

