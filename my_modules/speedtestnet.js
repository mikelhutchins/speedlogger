const speedTest = require('speedtest-net');
const Promise = require('bluebird');

function speedtestnet(testTime) {
    return new Promise((resolve,reject)=>{
        let test = speedTest({maxTime: testTime});

        test.on('data', data => {
            return resolve(data);
        });

        test.on('error', err => {
            return reject(err);
        });
    });
}

module.exports = speedtestnet;