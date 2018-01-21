// user searches table
module.exports = function (sequelize, DataTypes) {
	var user_interests = sequelize.define("user_interests", {
		interest_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		interest_name: DataTypes.STRING ,
		interest_description: DataTypes.TEXT,
		interest_icon: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	});


	user_interests.associate = (models) => {
		user_interests.belongsToMany(models.recipients, {
			through: 'user_interest_mapping',
			as: 'recipients',
			foreignKey: 'interest_id'
		});
	};


	return user_interests;
};
