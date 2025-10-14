module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['plugin:n8n-nodes-base/community'],
  rules: {
    'n8n-nodes-base/node-param-display-name-miscased': 'warn',
    'n8n-nodes-base/node-param-display-name-excess-whitespace': 'warn',
    'n8n-nodes-base/node-param-description-excess-final-period': 'warn',
    'n8n-nodes-base/node-param-description-excess-inner-whitespace': 'warn',
    'n8n-nodes-base/node-param-description-identical-to-display-name': 'warn',
  },
};
