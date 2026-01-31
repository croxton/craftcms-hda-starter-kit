/** @type {import('stylelint').Config} */
export default {
    "extends":[
        "stylelint-config-recommended",
        "stylelint-config-recommended-vue"
    ],
    "plugins": [
        "stylelint-order"
    ],
    "ignoreFiles": [
        "src/styles/vendor/**/*.css",
    ],
    "rules": {
        "at-rule-no-deprecated": [
            true,
            {
                "ignoreAtRules": [
                    "apply"
                ]
            }
        ],
        "at-rule-no-unknown": [
            true,
            {
                "ignoreAtRules": [
                    "theme",
                    "source",
                    "utility",
                    "variant",
                    "custom-variant",
                    "plugin",
                    "reference",
                    "tailwind",
                    "apply",
                    "layer",
                    "config",
                    "variants",
                    "responsive",
                    "screen"
                ]
            }
        ],
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
        "function-no-unknown": [
            true,
            {
                "ignoreFunctions": [
                    "theme"
                ]
            }
        ],
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
        "no-invalid-position-at-import-rule": null,
        "order/properties-alphabetical-order": true,
        "nesting-selector-no-missing-scoping-root": null
    }
};