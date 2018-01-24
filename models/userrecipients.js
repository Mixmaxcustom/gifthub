'use strict';

module.exports = (sequelize, DataTypes) => {
    var UserRecipients = sequelize.define('UserRecipients', {}, {
    });
    return UserRecipients;
};
