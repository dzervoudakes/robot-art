module.exports = {
	extends: 'stylelint-config-standard',
	syntax: 'scss',
	plugins: ['stylelint-order'],
  rules: {
		'declaration-block-no-redundant-longhand-properties': true,
		'indentation': 'tab',
		'order/properties-alphabetical-order': true,
		'property-no-vendor-prefix': true,
		'selector-list-comma-newline-after': 'always-multi-line',
		'shorthand-property-no-redundant-values': true,
		'string-quotes': 'single',
		'value-list-comma-space-after': 'always'
	}
}
