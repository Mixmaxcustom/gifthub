// gift -> category table
module.exports = function (sequelize, DataTypes) {
	var gift_category_mapping = sequelize.define("gift_category_mapping", {
		gift_category_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		gift_id: DataTypes.INTEGER,
		category_id: DataTypes.INTEGER,
	});
	return gift_category_mapping;
};