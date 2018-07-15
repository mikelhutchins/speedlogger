const elasticsearch = require('elasticsearch');
function esconnect(configFile) {
   return new elasticsearch.Client({
        host: configFile.elasticHost
    });
}
module.exports = esconnect;