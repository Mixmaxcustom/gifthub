// user -> category table
module.exports = function (sequelize, DataTypes) {
	var user_event_mapping = sequelize.define("user_event_mapping", {
		uevent_map_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		user_id: DataTypes.INTEGER,
		event_id: DataTypes.INTEGER,
	});
	return user_event_mapping;
};