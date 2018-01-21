// recipients table
module.exports = function(sequelize, DataTypes) {
    var Recipients = sequelize.define("Recipients", {
        recipient_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        recipient_title: {
            type: DataTypes.STRING
        },

        recipient_firstname: DataTypes.STRING,
        recipient_lastname: DataTypes.STRING,
        recipient_email: DataTypes.STRING,
        recipient_birthday: DataTypes.DATEONLY,
        recipient_bio: DataTypes.TEXT,
        recipient_city: DataTypes.STRING,
        recipient_photo: {
            type: DataTypes.STRING,
            defaultValue: '/img/user-avatar.png'
        },

        recipient_budget: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        timestamps: true,
        underscored: true
    });

    Recipients.associate = (models) => {
        Recipients.belongsToMany(models.Recipients, {
            through: 'search_gift_mappings',
            as: 'users',
            foreignKey: 'user_id'
        });
    };


    return Recipients;
};
