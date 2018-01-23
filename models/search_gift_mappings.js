'use strict';

module.exports = (sequelize, DataTypes) => {
    var SearchGifts = sequelize.define('search_gift_mappings', {}, {
        underscored: true
    });
    return SearchGifts;
};
