const chalk = require('chalk');
const readline = require('readline');

function styleWrite(message,style){

    switch (style){

        case 'wh':
            return console.log(`${chalk.bold.white(`${message}`)}`);
        // break;
        case 'wl':
            return console.log(`${chalk.white(`  ${chalk.bgWhite(` `)}  ${message}`)}`);
        //break;
        case 'sameline':
            if(arguments[2] !== undefined && arguments[3] !== undefined)
                readline.clearLine(process.stdout,0);
            return process.stdout.write(chalk.white(`\r${message}`));
        //break;
        case 'rl':
            return console.log(`${chalk.red(`  ${chalk.bgRed(` `)}  ${chalk.red(message)}`)}`);
        case 'rlnl':
            return console.log(`\n${chalk.red(`${chalk.red(message)}`)}`);
        case 'wlnl':
            return console.log(`\n${chalk.white(`${message}`)}`);
        case 'err':
            return console.log(chalk.red(message));
    }
}

module.exports = styleWrite;