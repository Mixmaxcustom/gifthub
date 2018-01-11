// users table
module.exports = function (sequelize, DataTypes) {
	var users = sequelize.define("users", {
		user_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		user_firstname: DataTypes.STRING,
		user_lastname: DataTypes.STRING,
		user_password: DataTypes.STRING,
		user_is_admin: DataTypes.BOOLEAN,
		user_email: DataTypes.STRING,
		user_birthday: DataTypes.DATEONLY,
		user_bio: DataTypes.TEXT,
		user_city: DataTypes.STRING,
		user_state: DataTypes.STRING,
		user_photo: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	});
	return users;
};
