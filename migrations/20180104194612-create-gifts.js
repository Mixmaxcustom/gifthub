'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Gifts', {
            id: {
                allowNull: true,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            gift_name: {
                type: Sequelize.STRING
            },
            gift_description: {
                type: Sequelize.STRING
            },
            gift_asin: {
                type: Sequelize.STRING
            },
            gift_part_num: {
                type: Sequelize.STRING
            },
            gift_photo: {
                type: Sequelize.STRING
            },
            gift_price: {
                type: Sequelize.INTEGER
            },
            gift_purchased: {
                type: Sequelize.BOOLEAN
            },
            gift_url: {
                type: Sequelize.STRING
            },
            gift_favorite: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Gifts');
    }
};
