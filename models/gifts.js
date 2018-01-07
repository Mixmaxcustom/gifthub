// gifts table
module.exports = function (sequelize, DataTypes) {
	var gifts = sequelize.define("gifts", {
		gift_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		gift_name: DataTypes.STRING,
		gift_model_num: DataTypes.STRING,
		gift_manufacturer: DataTypes.STRING,
		gift_photo: DataTypes.STRING,
		gift_price: DataTypes.DECIMAL(10, 2),
		gift_url1: DataTypes.STRING,
		gift_url2: DataTypes.STRING,
		gift_url3: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	});
	return gifts;
};