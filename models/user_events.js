// user searches table
module.exports = function (sequelize, DataTypes) {
	var Events = sequelize.define("Events", {
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
		Events.belongsToMany(models.Users, {
			through: 'user_event_mappings',
			as: 'events',
			foreignKey: 'event_id'
		});
	};


	Events.associate = (models) => {
		Events.belongsToMany(models.Recipients, {
			through: 'recipient_event_mappings',
			as: 'events',
			foreignKey: 'event_id'
		});
	};

	return Events;
};
