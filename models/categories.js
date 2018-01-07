// categories table
module.exports = function (sequelize, DataTypes) {
	var categories = sequelize.define("categories", {
		category_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		category_name: DataTypes.STRING,
		category_description: DataTypes.STRING
	});
	return categories;
};