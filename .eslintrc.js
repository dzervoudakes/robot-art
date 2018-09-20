const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
	extends: 'eslint:recommended',
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			ecmascript: 7,
			jsx: true
		}
	},
	plugins: ['react', 'import'],
	rules: {
		'arrow-parens': ['error', 'as-needed'],
		'comma-dangle': ['error', 'never'],
		'comma-spacing': ['error', { 'before': false, 'after': true }],
		'eol-last': ['error', 'always'],
		'import/imports-first': ['error', 'absolute-first'],
		'indent': ['error', 'tab'],
		'linebreak-style': [ERROR, 'unix'],
		'max-len': ['error', { code: 100 }],
		'no-console': WARN,
		'no-undef': OFF,
		'no-unused-vars': ['error'],
		'object-curly-spacing': ['error', 'always'],
		'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
		'react/jsx-curly-spacing': ['error', {
			'when': 'always',
			'spacing': {
				'objectLiterals': 'never'
			}
		}],
		'react/jsx-uses-react': WARN,
		'react/jsx-uses-vars': WARN,
		'react/no-unused-prop-types': ERROR,
		'react/prefer-stateless-function': ERROR,
		'semi': ['error', 'always'],
		'quotes': ['error', 'single']
	}
};
