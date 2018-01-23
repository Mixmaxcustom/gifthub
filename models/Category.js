'use strict';
module.exports = (sequelize, DataTypes) => {
    var Category = sequelize.define('Category', {
        category_name: DataTypes.STRING,
        category_description: DataTypes.TEXT,
        category_icon: DataTypes.STRING,
        category_age_limit: DataTypes.INTEGER
    });

    Category.associate = (models) => {
        Category.belongsToMany(models.Gift, {
            through: models.GiftCategories
        });
    }


    return Category;
};
