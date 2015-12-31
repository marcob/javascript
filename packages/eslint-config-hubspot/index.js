module.exports = {
  extends: [
    'eslint-config-hubspot/base',
    'eslint-config-hubspot/rules/strict',
    'eslint-config-hubspot/rules/react'
  ].map(require.resolve),
  rules: {}
};
