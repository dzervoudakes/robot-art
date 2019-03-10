const CLIEngine = require('eslint').CLIEngine;
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora('Linting all scripts...');
spinner.start();

const fix = process.argv.indexOf('--fix') !== -1;
const cli = new CLIEngine({ fix });

const report = cli.executeOnFiles(['**/*.js', '**/*.jsx']);
const formatter = cli.getFormatter();

if (fix) {
	CLIEngine.outputFixes(report);
}

spinner.stop();
console.log(formatter(report.results));

const { errorCount, warningCount } = report;
if (errorCount === 0 && warningCount === 0) {
	console.log(chalk.green('Linting complete: no warnings or errors found.'));
}
