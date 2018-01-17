// user -> category table
module.exports = function (sequelize, DataTypes) {
	var search_mapping = sequelize.define("search_mapping", {
		search_map_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		user_id: DataTypes.INTEGER,
		search_id: DataTypes.INTEGER,
	});
	return search_mapping;
};