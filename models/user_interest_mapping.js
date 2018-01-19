// user -> interest table
module.exports = function (sequelize, DataTypes) {
    var user_interest_mapping = sequelize.define("user_interest_mapping", {
        uint_map_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            defaultValue: -1
        },
        recipient_id: DataTypes.INTEGER,
        interest_id: DataTypes.INTEGER,
    });
    return user_interest_mapping;
};