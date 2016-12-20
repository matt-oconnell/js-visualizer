module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'comma-dangle': 0,
    'func-names': 0,
    'arrow-body-style': 0,
    'no-extraneous-dependencies': 0,
    'no-mixed-operators': 0,
    'no-confusing-arrow': 0,
    'strings-must-use-single-quote': 0,
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
