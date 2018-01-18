// recipients table
module.exports = function (sequelize, DataTypes) {
	var recipients = sequelize.define("recipients", {
		recipient_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
        },
        recipient_title: DataTypes.STRING,
		recipient_firstname: DataTypes.STRING,
		recipient_lastname: DataTypes.STRING,
		recipient_email: DataTypes.STRING,
		recipient_birthday: DataTypes.DATEONLY,
		recipient_bio: DataTypes.TEXT,
		recipient_city: DataTypes.STRING,
        recipient_photo: DataTypes.STRING,
        recipient_max_budget: DataTypes.INTEGER,
		createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
	});
	return recipients;
};
