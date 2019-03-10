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
		files: ['index.js', 'build/*.js'],
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
		'import/dynamic-import-chunkname': ERROR,
		'import/imports-first': [ERROR, 'absolute-first'],
		'import/no-unresolved': ERROR,
		'import/order': [ERROR, {
			groups: [
				'builtin',
				'external',
				'internal',
				['parent', 'sibling'],
				'index'
			],
			'newlines-between': 'never'
		}],
		indent: [ERROR, 'tab'],
		'linebreak-style': OFF,
		'max-len': [ERROR, { code: 100 }],
		'no-console': WARN,
		'no-undef': OFF,
		'no-unused-vars': ERROR,
		'object-curly-spacing': [ERROR, 'always'],
		'react/jsx-closing-bracket-location': [ERROR, 'line-aligned'],
		'react/jsx-curly-spacing': [ERROR, { when: 'never', children: true }],
		'react/jsx-uses-react': WARN,
		'react/jsx-uses-vars': WARN,
		'react/no-array-index-key': OFF,
		'react/no-unused-prop-types': ERROR,
		'react/prefer-stateless-function': ERROR,
		'react/sort-comp': [ERROR, {
			order: [
				'props',
				'static-methods',
				'lifecycle',
				'everything-else',
				'handlers',
				'rendering',
			],
			groups: {
				props: [
					'propTypes',
					'defaultProps',
				],
				lifecycle: [
					'statics',
					'constructor',
					'getDerivedStateFromProps',
					'componentWillMount',
					'UNSAFE_componentWillMount',
					'componentDidMount',
					'componentWillReceiveProps',
					'UNSAFE_componentWillReceiveProps',
					'shouldComponentUpdate',
					'componentWillUpdate',
					'UNSAFE_componentWillUpdate',
					'getSnapshotBeforeUpdate',
					'componentDidUpdate',
					'componentDidCatch',
					'componentWillUnmount',
				],
				'handlers': [
					'/^on.+$/',
					'/^handle.+$/',
				],
				'rendering': [
					'/^render.+$/',
					'render',
				],
			}
		}],
		semi: [ERROR, 'always'],
		quotes: [ERROR, 'single']
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: 'build/webpack.base.js'
			}
		}
	}
};
