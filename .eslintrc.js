const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: 'eslint:recommended',
	overrides: [{
		files: ['build/*.js'],
		rules: {
			'no-console': OFF
		}
	}],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 9,
		sourceType: 'module',
		ecmaFeatures: {
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
		'import/no-unresolved': ERROR,
		'indent': ['error', 'tab'],
		'linebreak-style': OFF,
		'max-len': ['error', { code: 100 }],
		'no-console': WARN,
		'no-undef': OFF,
		'no-unused-vars': ERROR,
		'object-curly-spacing': ['error', 'always'],
		'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
		'react/jsx-curly-spacing': ['error', {
			when: 'always',
			spacing: {
				objectLiterals: 'never'
			}
		}],
		'react/jsx-uses-react': WARN,
		'react/jsx-uses-vars': WARN,
		'react/no-array-index-key': OFF,
		'react/no-unused-prop-types': ERROR,
		'react/prefer-stateless-function': ERROR,
		'semi': ['error', 'always'],
		'quotes': ['error', 'single']
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: 'build/webpack.common.js'
			}
		}
	}
};
