'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: true,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_firstname: {
                type: Sequelize.STRING
            },
            user_lastname: {
                type: Sequelize.STRING
            },
            user_password: {
                type: Sequelize.STRING
            },
            user_is_admin: {
                type: Sequelize.BOOLEAN
            },
            user_email: {
                type: Sequelize.STRING
            },
            user_birthday: {
                type: Sequelize.DATEONLY
            },
            user_bio: {
                type: Sequelize.TEXT
            },
            user_city: {
                type: Sequelize.STRING
            },
            user_state: {
                type: Sequelize.STRING
            },
            user_photo: {
                type: Sequelize.STRING
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
        return queryInterface.dropTable('Users');
    }
};
