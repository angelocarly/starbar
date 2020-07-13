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
		"indent": [ "off", 4 ],
		"linebreak-style": [ "warn", "unix" ],
		"quotes": [ "warn", "double" ],
		"semi": [ "warn", "always" ],
		"object-curly-spacing": [ "warn", "always" ],
		"no-mixed-spaces-and-tabs": [ "off", "smart-tabs" ],
		"eol-last": [ "warn", "always" ],
	}
};
