var amazon = require('amazon-product-api');


var client = amazon.createClient({
    awsId: process.env.PROD_AWS_ID || "aws-id",
    awsSecret: process.env.PROD_AWS_SECRET || "aws-pass",
    awsTag: process.env.PROD_AWS_TAG || "gifthub-20"
});


module.exports = client;
