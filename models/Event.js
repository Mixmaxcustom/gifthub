'use strict';
module.exports = (sequelize, DataTypes) => {
    var Event = sequelize.define('Event', {
        event_name: DataTypes.STRING,
        event_description: DataTypes.TEXT,
        event_date: DataTypes.DATE,
        event_budget: DataTypes.INTEGER
    });

    return Event;
};
