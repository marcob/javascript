module.exports = {
  extends: [
    'eslint-config-hubspot/base',
    'eslint-config-hubspot/rules/strict',
    'eslint-config-hubspot/rules/react',
    'eslint-config-hubspot/rules/experimental'
  ].map(require.resolve),
  rules: {}
};
