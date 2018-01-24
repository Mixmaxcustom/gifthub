'use strict';

const fs        = require('fs');
const path      = require('path');
const seedfile  = 'events';
const modelname = 'Events';

let seedData    = JSON.parse(fs.readFileSync(path.join(__dirname, `../data/${seedfile}.json`), `utf8`));


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(modelname, seedData, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(modelname, seedData, {});
    }
};
