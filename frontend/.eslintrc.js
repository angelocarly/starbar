module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
    ],
    "rules": {
        "@typescript-eslint/no-unused-vars" : "warn",
        "indent": [ "warn", 4, { "SwitchCase": 1 } ],
        "linebreak-style": [ "error", "unix" ],
        "quotes": [ "warn", "double" ],
        "semi": [ "warn", "always" ],
        "no-unused-vars": [ "warn", { "vars": "all", "caughtErrors": "all" } ],
        "object-curly-spacing": [ "warn", "always" ],
    }
};
