// user -> recipients table
module.exports = function (sequelize, DataTypes) {
	var recipient_mapping = sequelize.define("recipient_mapping", {
		rmap_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		user_id: DataTypes.INTEGER,
		recipient_id: DataTypes.INTEGER,
	});
	return recipient_mapping;
};