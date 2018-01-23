'use strict';

module.exports = (sequelize, DataTypes) => {
    var RecipientInterests = sequelize.define('recipient_interest_mappings', {}, {
        underscored: true
    });
    return RecipientInterests;
};
