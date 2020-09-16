// eslint-disable-next-line no-undef
module.exports = {
	"env": {
		"browser": true,
		"es2020": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"ignorePatterns": ["dist/*"],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 11,
		"sourceType": "module"
	},
	"plugins": [ "@typescript-eslint" ],
	"rules": {
		"indent": [ "warn", "tab" ],
		"linebreak-style": [ "warn", "unix" ],
		"quotes": [ "warn", "double" ],
		"semi": [ "warn", "always" ],
		"object-curly-spacing": [ "warn", "always" ],
		"no-mixed-spaces-and-tabs": [ "off", "smart-tabs" ],
		"eol-last": [ "warn", "always" ],
		"@typescript-eslint/no-unused-vars" : "warn",
		"no-unused-vars": [ "warn", { "vars": "all", "caughtErrors": "all" } ],
		"operator-linebreak": ["warn", "before"],
		"multiline-ternary": ["warn", "always-multiline"],
		"dot-notation": ["warn"],
		"dot-location": ["warn", "property"],
		"eqeqeq": ["warn", "smart"],
		"@typescript-eslint/no-non-null-assertion": "off"
	}
};
