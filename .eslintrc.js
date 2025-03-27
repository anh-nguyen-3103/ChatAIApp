// .eslintrc.js
module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    curly: ['error', 'all'],
    'jsx-quotes': ['error', 'prefer-single'],
    // Add this rule to disable the component-in-render warning
    'react/jsx-no-bind': [
      'error',
      {
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
        ignoreDOMElements: false,
      },
    ],
    // Alternative approach
    'react/no-unstable-nested-components': [
      'warn',
      {
        allowAsProps: true,
      },
    ],
  },
};
