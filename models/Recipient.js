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
        recipient_photo: {
            type: DataTypes.STRING,
            defaultValue: '/img/user-avatar.png'
        },
        recipient_budget: DataTypes.INTEGER
    }, {
        getterMethods: {
            // props go to Jake for figuring this out!!
            unpurchasedGifts() {
                return this.getGifts({
                    where: { gift_purchased: { [sequelize.Op.gt]: false } }
                })
            }
        },
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
