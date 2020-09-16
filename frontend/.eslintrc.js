// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"@typescript-eslint/no-unused-vars": "warn",
		indent: ["warn", "tab"],
		"linebreak-style": ["warn", "unix"],
		quotes: ["warn", "double"],
		semi: ["warn", "always"],
		"no-unused-vars": ["warn", { vars: "all", caughtErrors: "all" }],
		"object-curly-spacing": ["warn", "always"],
		"eol-last": ["warn", "always"],
		"operator-linebreak": ["warn", "before"],
		"multiline-ternary": ["warn", "always-multiline"],
		"dot-notation": ["warn"],
		"dot-location": ["warn", "property"],
		eqeqeq: ["warn", "smart"],
		"react/display-name": "off",
		"react/prop-types": "off",
	},
};
