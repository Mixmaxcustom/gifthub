// Amazon API client module
const awsclient = require('./config/amazon');


var AmazonClient = {
    client: awsclient
};


console.log(`# Initializing Amazon API Client...`);
module.exports = AmazonClient;