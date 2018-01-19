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
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	});
	return user_interests;
};