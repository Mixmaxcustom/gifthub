// gifts table
module.exports = function (sequelize, DataTypes) {
	var vendors = sequelize.define("vendors", {
		vendor_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		vendor_name: DataTypes.STRING,
		vendor_description: DataTypes.STRING,
		vendor_url: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	});
	return vendors;
};