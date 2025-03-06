// @see https://github.com/eslint/eslintrc
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default [

    ...compat.config({
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
            'plugin:vue/recommended',
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
            'no-prototype-builtins': 'off',
            'vue/no-multiple-template-root': 'off'
        },
    })
];