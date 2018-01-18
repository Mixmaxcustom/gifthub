// gift -> recipient table
module.exports = function (sequelize, DataTypes) {
	var gift_recipient_mapping = sequelize.define("gift_recipient_mapping", {
		rec_gift_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		gift_id: DataTypes.INTEGER,
		recipient_id: DataTypes.INTEGER,
	});
	return gift_recipient_mapping;
};