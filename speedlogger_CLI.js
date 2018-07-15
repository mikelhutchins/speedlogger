//const start_time = new Date();
const cmdr = require('commander');
const chalk = require('chalk');
const fig = require('figlet');
const fast = require('./my_modules/fast.js');
const speedtest = require('./my_modules/speedtestnet.js');
const conWrite = require('./my_modules/consolewriter.js');
const elasticsearch = require('./my_modules/elasticConnect.js');

let esfastid = 0;
let id = 0;
let configFile = {};

cmdr
    .command('logspeed <configurationFile>')
    .description(`This is to see if i'm getting screwed by Suddenlink.`)
    .action((configurationFile)=>{
         configFile = require(`${configurationFile}`);
        const elastic = elasticsearch(configFile);
        //console.log(elastic.info());
        fig(`Speed Logger`, (err, data)=>{
            if (err) {
                console.log(chalk.red('Whomp Whomp... Something went wrong...'));
                console.dir(err);
                return;
            }
            conWrite(`Running...`,'sameline');
            //esfastid = esfastid + 1;
            console.log(chalk.bold.blue(data));
            return setInterval(()=>{
                conWrite(`Running...`,'sameline');
                fast(configFile.testTime,esfastid++)
                .then((fastresult)=>{
                    conWrite(`ID: ${fastresult.id} Speed: ${fastresult.speed} Mbps Date: ${fastresult.logdate}`,'sameline');
                    //process.exit(0);
                    return elastic.index({
                        index: configFile.fastIndex,
                        type: 'speedlog',
                        body: {
                            speed: fastresult.speed,
                            logdate: fastresult.logdate
                        }
                    });
                }).then(()=>{
                    return speedtest(configFile.testTime)
                        .then((speedresult)=>{
                            conWrite(`ID: ${esfastid - 1} Download: ${speedresult.speeds.download} Upload: ${speedresult.speeds.upload}`,'sameline');
                            return elastic.index({
                                index: configFile.speedtestIndex,
                                type: 'speedlog',
                                body: speedresult
                            });
                    });
                })},configFile.interval);
        });
    });

cmdr.parse(process.argv);