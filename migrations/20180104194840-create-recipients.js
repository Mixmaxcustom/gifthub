'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Recipients', {
            id: {
                allowNull: true,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            recipient_title: {
                type: Sequelize.STRING
            },
            recipient_firstname: {
                type: Sequelize.STRING
            },
            recipient_lastname: {
                type: Sequelize.STRING
            },
            recipient_email: {
                type: Sequelize.STRING
            },
            recipient_birthday: {
                type: Sequelize.DATEONLY
            },
            recipient_bio: {
                type: Sequelize.TEXT
            },
            recipient_city: {
                type: Sequelize.STRING
            },
            recipient_state: {
                type: Sequelize.STRING
            },
            recipient_photo: {
                type: Sequelize.STRING
            },
            recipient_budget: {
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable('Recipients');
    }
};
