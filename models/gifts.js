// gifts table
module.exports = function (sequelize, DataTypes) {
	var gifts = sequelize.define("gifts", {
		gift_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

		gift_name: DataTypes.STRING,
		gift_description: DataTypes.STRING,		
		gift_asin: DataTypes.STRING,
		gift_upc: DataTypes.STRING,
		gift_photo: DataTypes.STRING,
		gift_price: DataTypes.DECIMAL(10, 2),
		gift_purchased: DataTypes.BOOLEAN,
		gift_url: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	});
	return gifts;
};