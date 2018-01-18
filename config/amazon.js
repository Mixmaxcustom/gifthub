var amazon = require('amazon-product-api');


var client = amazon.createClient({
    awsId: process.env.PROD_AWS_ID || "AKIAIITQUQJBHFLN3HGQ",
    awsSecret: process.env.PROD_AWS_SECRET || "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",
    awsTag: PROD_AWS_TAG || "gifthub-20"
});


module.exports = client;
