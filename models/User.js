'use strict';

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        user_firstname: DataTypes.STRING,
        user_lastname: DataTypes.STRING,
        user_password: DataTypes.STRING,
        user_is_admin: DataTypes.BOOLEAN,
        user_email: DataTypes.STRING,
        user_birthday: DataTypes.DATEONLY,
        user_bio: DataTypes.TEXT,
        user_city: DataTypes.STRING,
        user_state: DataTypes.STRING,
        user_photo: DataTypes.STRING
    }, {
        getterMethods: {
          fullName() {
              return this.user_firstname + ' ' + this.user_lastname
          }
        },
    });

    User.associate = (models) => {
        User.belongsToMany(models.Recipient, {
            through: models.UserRecipients
        });
    };

    return User;
};
