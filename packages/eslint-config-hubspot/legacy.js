module.exports = {
  'extends': [
    'eslint-config-hubspot/rules/best-practices',
    'eslint-config-hubspot/rules/errors',
    'eslint-config-hubspot/rules/legacy',
    'eslint-config-hubspot/rules/node',
    'eslint-config-hubspot/rules/strict',
    'eslint-config-hubspot/rules/style',
    'eslint-config-hubspot/rules/variables'
  ],
  'env': {
    'browser': true,
    'node': true,
    'amd': false,
    'mocha': false,
    'jasmine': false
  },
  'ecmaFeatures': {},
  'globals': {},
  'rules': {}
};
