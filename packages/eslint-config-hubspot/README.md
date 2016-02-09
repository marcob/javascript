# eslint-config-hubspot

[![npm version](https://badge.fury.io/js/eslint-config-hubspot.svg)](https://badge.fury.io/js/eslint-config-hubspot)

> Forked from [Airbnb's Style Guide](https://github.com/airbnb/javascript)

This package provides HubSpot's .eslintrc as an extensible shared config.


## Usage

We export three ESLint configurations for your usage.

### eslint-config-hubspot

Our default export contains all of our ESLint rules, including EcmaScript 6+ and
React, but excludes experimental features. It requires `eslint` and
`eslint-plugin-react`.

1. `npm install --save-dev eslint-config-hubspot eslint-plugin-react eslint`
2. add `"extends": "hubspot"` to your .eslintrc

### eslint-config-hubspot/base

Lints ES6+ but does not lint React. Requires `eslint`.

1. `npm install --save-dev eslint-config-hubspot eslint`
2. add `"extends": "hubspot/base"` to your .eslintrc

### eslint-config-hubspot/experimental

Lints EcmaScript 6+, React, and experimental features. It requires `eslint`,
`eslint-plugin-react`, `eslint-plugin-babel`, and `babel-eslint`.

1. `npm install --save-dev eslint-config-hubspot eslint-plugin-react eslint-plugin-babel babel-eslint eslint`
2. add `"extends": "hubspot/experimental"` to your .eslintrc

### eslint-config-hubspot/legacy

Lints ES5 and below. Only requires `eslint`.

1. `npm install --save-dev eslint-config-hubspot eslint`
2. add `"extends": "hubspot/legacy"` to your .eslintrc

See [HubSpot's Javascript styleguide](https://github.com/HubSpot/javascript) and
the [ESlint config docs](http://eslint.org/docs/user-guide/configuring#extending-configuration-files)
for more information.

## Improving this config

Consider adding test cases if you're making complicated rules changes, like
anything involving regexes. Perhaps in a distant future, we could use literate
programming to structure our README as test cases for our .eslintrc?

You can run tests with `npm test`.

You can make sure this module lints with itself using `npm run lint`.
