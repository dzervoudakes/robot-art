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
		'arrow-parens': [ERROR, 'as-needed'],
		'comma-dangle': [ERROR, 'never'],
		'comma-spacing': [ERROR, { 'before': false, 'after': true }],
		'eol-last': [ERROR, 'always'],
		'import/imports-first': [ERROR, 'absolute-first'],
		'import/no-unresolved': ERROR,
		'indent': [ERROR, 'tab'],
		'linebreak-style': OFF,
		'max-len': [ERROR, { code: 100 }],
		'no-console': WARN,
		'no-undef': OFF,
		'no-unused-vars': ERROR,
		'object-curly-spacing': [ERROR, 'always'],
		'react/jsx-closing-bracket-location': [ERROR, 'line-aligned'],
		'react/jsx-curly-spacing': [ERROR, {
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
		'semi': [ERROR, 'always'],
		'quotes': [ERROR, 'single']
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: 'build/webpack.common.js'
			}
		}
	}
};
