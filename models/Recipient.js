'use strict';
module.exports = (sequelize, DataTypes) => {
    var Recipient = sequelize.define('Recipient', {
        recipient_title: DataTypes.STRING,
        recipient_firstname: DataTypes.STRING,
        recipient_lastname: DataTypes.STRING,
        recipient_email: DataTypes.STRING,
        recipient_birthday: DataTypes.DATEONLY,
        recipient_bio: DataTypes.TEXT,
        recipient_city: DataTypes.STRING,
        recipient_state: DataTypes.STRING,
        recipient_photo: DataTypes.STRING,
        recipient_budget: DataTypes.INTEGER
    });

    Recipient.associate = (models) => {
        Recipient.belongsToMany(models.User, {
            through: models.UserRecipients
        });

        Recipient.belongsToMany(models.Gift, {
            through: models.RecipientGifts
        });
    };

    return Recipient;
};
