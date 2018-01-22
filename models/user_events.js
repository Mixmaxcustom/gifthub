// user searches table
module.exports = function (sequelize, DataTypes) {
	var Events = sequelize.define("events", {
		event_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		event_name: DataTypes.STRING ,
        event_description: DataTypes.TEXT,
		event_date: DataTypes.DATE,
		event_budget: DataTypes.INTEGER,
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE,
	}, {
        timestamps: true,
        underscored: true
    });

	Events.associate = (models) => {
		Events.belongsToMany(models.users, {
			through: 'user_event_mappings'
		});
	};


	Events.associate = (models) => {
		Events.belongsToMany(models.recipients, {
			through: 'recipient_event_mappings'
		});
	};

	return Events;
};
