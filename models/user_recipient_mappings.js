'use strict';

module.exports = (sequelize, DataTypes) => {
    var UserRecipients = sequelize.define('user_recipient_mappings', {}, {
        underscored: true
    });
    return UserRecipients;
};
