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
	plugins: [
		'react'
	],
	rules: {
		'arrow-parens': ['error', 'as-needed'],
		'comma-dangle': 0,
		'eol-last': ['error', 'always'],
		'indent': ['error', 'tab'],
		'linebreak-style': 0,
		'max-len': ['error', { code: 100 }],
		'no-console': 1,
		'no-undef': 0,
		'no-unused-vars': ['error'],
		'react/jsx-closing-bracket-location': [1, 'line-aligned'],
		'react/jsx-curly-spacing': [2, {
			'when': 'always',
			'spacing': {
				'objectLiterals': 'never'
			}
		}],
		'react/jsx-uses-react': 1,
		'react/jsx-uses-vars': 1,
		'react/no-unused-prop-types': 2,
		'react/prefer-stateless-function': 2
	}
};