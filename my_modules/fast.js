const FastSpeedtest = require("fast-speedtest-api");
const dateTime = require('date-time');
//const conWrite = require('./consolewriter.js');

function fasttest(waitTime,id) {

    let speedtest = new FastSpeedtest({
        token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
        verbose: false, // default: false
        timeout: waitTime, // default: 5000
        https: true, // default: true
        urlCount: 5, // default: 5
        bufferSize: 8,// default: 8
        unit: FastSpeedtest.UNITS.Mbps // default: Bps
    });

    return speedtest.getSpeed().then(s => {
        let foshizzle = dateTime();
        return mynizzle = {
            id: id,
            logdate: foshizzle,
            speed: s
        };
        // mynizzle;
        //conWrite(`Speed: ${mynizzle.speed} Mbps Date: ${mynizzle.logdate}`,'wlnl');
        //console.log(`date: ${mynizzle.logdate}  speed: ${mynizzle.speed} Mbps`);
        // return pgknex('logs.speedlog').insert(mynizzle).then(()=>{
        //     process.exit(0);
        // });
    }).catch((e) => {
        console.error(`Error ${e.message}`);
        return e.message;
    });
}

module.exports = fasttest;