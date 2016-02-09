import test from 'tape';
import { CLIEngine } from 'eslint';
import experimentalRules from '../rules/experimental';

const cli = new CLIEngine({
  useEslintrc: false,
  baseConfig: {
    extends: 'hubspot/experimental'
  },
  rules: {
    'indent': 0,
    'no-unused-vars': 0
  },
});

function lint(text) {
  return cli.executeOnText(text).results[0];
}

test('validate experimental features', t => {
  t.test('make sure our eslintrc has Babel linting dependencies', t => {
    t.plan(1);
    t.equal(experimentalRules.plugins[0], 'babel', 'uses eslint-plugin-babel');
  });

  t.test('babel/generator-star-spacing', t => {
    t.plan(6);

    const good = lint('function* generator() {}\n');
    t.notOk(good.warningCount, 'no warnings');
    t.notOk(good.errorCount, 'no errors');
    t.deepEquals(good.messages, [], 'no messages in results');

    const bad = lint('function *generator() {}\n');
    t.notOk(bad.warningCount, 'no warnings');
    t.ok(bad.errorCount, 'should have errors');
    t.notDeepEqual(bad.messages, [], 'should have messages in results');
  });

  t.test('babel/new-cap', t => {
    t.plan(3);

    const good = lint([
      'function Decorator() {}',
      '@Decorator',
      'class Component {}\n'
    ].join('\n'));
    t.notOk(good.warningCount, 'no warnings');
    t.notOk(good.errorCount, 'no errors');
    t.deepEquals(good.messages, [], 'no messages in results');
  });

  t.test('babel/no-await-in-loop', t => {
    t.plan(3);

    const bad = lint([
      'async function foo() {',
      '  for (const bar of {}) {',
      '    await(bar);',
      '  }',
      '}\n'
    ].join('\n'));
    t.notOk(bad.warningCount, 'no warnings');
    t.ok(bad.errorCount, 'should have errors');
    t.notDeepEqual(bad.messages, [], 'should have messages in results');
  });
});
