module.exports = {
  'parser': 'babel-eslint',
  'plugins': [
    'babel'
  ],
  'ecmaFeatures': {
    'experimentalObjectRestSpread': true,
  },
  'rules': {
    // handles async/await functions correctly
    'babel/generator-star-spacing': [2, {'before': false, 'after': true}],
    // ignores capitalized decorators (@Decorator)
    'babel/new-cap': [2, { 'newIsCap': true, 'capIsNew': false }],
    // handles destructuring arrays with flow type in function parameters
    'babel/array-bracket-spacing': [2, 'never'],
    // doesn't complain about export x from "mod"; or export * as x from "mod";
    'babel/object-curly-spacing': [0, 'always'],
    // doesn't fail when using object spread (...obj)
    'babel/object-shorthand': [2, 'always'],
    // handles async functions correctly
    'babel/arrow-parens': 0,
    // guard against awaiting async functions inside of a loop
    'babel/no-await-in-loop': 2
  }
};
