// user searches table
module.exports = function (sequelize, DataTypes) {
	var user_events = sequelize.define("user_events", {
		event_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		event_name: DataTypes.STRING ,
        event_description: DataTypes.TEXT,
		event_date: DataTypes.DATE,
		event_budget: DataTypes.INTEGER,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	});
	return user_events;
};
