/** @type {import('stylelint').Config} */
export default {
    "extends":[
        "stylelint-config-recommended",
        "stylelint-config-recommended-scss",
        "stylelint-config-recommended-vue"
    ],
    "plugins": [
        "stylelint-order",
        "stylelint-scss"
    ],
    "ignoreFiles": [
        "src/styles/vendor/**/*.scss",
    ],
    "rules": {
        "at-rule-descriptor-value-no-unknown": null,
        "at-rule-no-deprecated": [
            true,
            {
                "ignoreAtRules": [
                    "apply"
                ]
            }
        ],
        "at-rule-no-unknown": null,
        "block-no-empty": [
            true,
            {
                "ignore": [
                    "comments"
                ]
            }
        ],
        "declaration-property-value-no-unknown": [
            true,
            {
                "ignoreProperties": {
                    "/.+/": "/^.*?theme/"
                }
            }
        ],
        "import-notation": "string",
        "media-query-no-invalid" : [
            true,
            {
                "ignoreFunctions": [
                    "theme",
                    "screen"
                ]
            }
        ],
        "no-descending-specificity": null,
        "no-duplicate-selectors": true,
        "no-invalid-position-at-import-rule": true,
        "order/properties-alphabetical-order": true,
        "scss/at-rule-no-unknown": [
            true,
            {
                "ignoreAtRules": [
                    "theme",
                    "source",
                    "utility",
                    "variant",
                    "custom-variant",
                    "plugin",
                    "tailwind",
                    "apply",
                    "layer",
                    "config",
                    "variants",
                    "responsive",
                    "screen",
                    "use"
                ]
            }
        ],
        "scss/function-no-unknown": [
            true,
            {
                "ignoreFunctions": [
                    "theme"
                ]
            }
        ],
        "scss/operator-no-unspaced": null
    }
};