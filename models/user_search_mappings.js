'use strict';

module.exports = (sequelize, DataTypes) => {
    var UserSearches = sequelize.define('user_search_mappings', {}, {
        underscored: true}
    );
    return UserSearches;
};
