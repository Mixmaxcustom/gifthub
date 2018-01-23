'use strict';
module.exports = (sequelize, DataTypes) => {
    var Gift = sequelize.define('Gift', {
        gift_name: DataTypes.STRING,
        gift_description: DataTypes.STRING,
        gift_asin: DataTypes.STRING,
        gift_part_num: DataTypes.STRING,
        gift_photo: DataTypes.STRING,
        gift_price: DataTypes.INTEGER,
        gift_purchased: DataTypes.BOOLEAN,
        gift_url: DataTypes.STRING,
        gift_favorite: DataTypes.BOOLEAN
    });

    Gift.associate = (models) => {
        Gift.belongsToMany(models.Category, {
            through: models.GiftCategories
        });

        Gift.belongsToMany(models.Recipient, {
            through: models.RecipientGifts
        });
    };

    return Gift;
};
