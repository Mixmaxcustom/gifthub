// user -> category table
module.exports = function (sequelize, DataTypes) {
	var user_category_mapping = sequelize.define("user_category_mapping", {
		ucmap_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		user_id: DataTypes.INTEGER,
		category_id: DataTypes.INTEGER,
	});
	return user_category_mapping;
};