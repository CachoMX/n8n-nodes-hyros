module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['plugin:n8n-nodes-base/community'],
  rules: {
    // The scanner's @n8n/community-nodes ruleset errors on this but the community
    // preset does not, so it can only surface after publishing (the scanner takes a
    // published package name, never a local path). Promoted here to fail pre-release.
    'n8n-nodes-base/node-param-options-type-unsorted-items': 'error',
    'n8n-nodes-base/node-param-display-name-miscased': 'warn',
    'n8n-nodes-base/node-param-description-excess-final-period': 'warn',
    'n8n-nodes-base/node-param-description-excess-inner-whitespace': 'warn',
    'n8n-nodes-base/node-param-description-identical-to-display-name': 'warn',
  },
};
