// users table
module.exports = function (sequelize, DataTypes) {
	var Users = sequelize.define("users", {
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
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE,
	}, {
        timestamps: true,
        underscored: true
	});



	Users.associate = (models) => {
	    Users.hasMany(models.recipients);
	};

	Users.associate = (models) => {
		Users.belongsToMany(models.recipients, {
			through: 'user_recipient_mappings'
		});
	};


	return Users;
};
