// user searches table
module.exports = function (sequelize, DataTypes) {
	var Interests = sequelize.define("Interests", {
		interest_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		interest_name: DataTypes.STRING ,
		interest_description: DataTypes.TEXT,
		interest_icon: DataTypes.STRING,
		interest_age_min: {
			type: DataTypes.INTEGER ,
			defaultValue: 13
		},
		interest_female: {
			type: DataTypes.BOOLEAN ,
			defaultValue: 0
		},
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE,
	}, {
        timestamps: true,
        underscored: true
    });


	Interests.associate = (models) => {
		Interests.belongsToMany(models.Recipients, {
			through: 'recipient_interest_mappings',
			as: 'interests',
			foreignKey: 'interest_id'
		});
	};

	Interests.associate = (models) => {
		Interests.belongsToMany(models.Categories, {
			through: 'recipient_interest_mappings',
			as: 'interests',
			foreignKey: 'interest_id'
		});
	};

	return Interests;
};
