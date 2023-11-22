// rule reference: http://eslint.org/docs/rules
// individual rule reference: http://eslint.org/docs/rules/NAME-OF-RULE
module.exports = {
    env: {
        browser: true,
        es2022: true
    },
    parserOptions: {
        'parser': '@babel/eslint-parser',
        'sourceType': 'module',
        'ecmaVersion': "latest",
        'requireConfigFile': false
    },
    extends: [
        // add more generic rulesets here
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:compat/recommended',
    ],
    plugins: [
        'compat'
    ],
    rules: {
        strict: [0],
        'prefer-spread': [0],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-prototype-builtins': 'off'
    },
};