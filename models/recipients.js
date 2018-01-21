// recipients table
module.exports = function(sequelize, DataTypes) {
    var recipients = sequelize.define("recipients", {
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });


    recipients.associate = (models) => {
        recipients.belongsToMany(models.user_interests, {
            through: 'user_interest_mapping',
            as: 'interests',
            foreignKey: 'recipient_id'
        });
    };

    return recipients;
};
