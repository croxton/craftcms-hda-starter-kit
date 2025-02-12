/** @type {import('stylelint').Config} */
export default {
    "extends":[
        "stylelint-config-recommended",
        "stylelint-config-recommended-vue"
    ],
    "plugins": [
        "stylelint-order"
    ],
    "rules": {
        "order/properties-alphabetical-order": true,
        "no-descending-specificity": null,
        "no-invalid-position-at-import-rule": null,
        "import-notation": null,
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
        "at-rule-no-deprecated": [
            true,
            {
                "ignoreAtRules": [
                    "apply"
                ]
            }
        ],
        "function-no-unknown": [
            true,
            {
                "ignoreFunctions": [
                    "theme"
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
        "media-query-no-invalid" : [
            true,
            {
                "ignoreFunctions": [
                    "theme",
                    "screen"
                ]
            }
        ]
    }
};