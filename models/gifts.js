// gifts table
module.exports = function (sequelize, DataTypes) {
	var Gifts = sequelize.define("Gifts", {
		gift_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

		gift_name: DataTypes.STRING,
		gift_description: DataTypes.STRING,
		gift_asin: DataTypes.STRING,
		gift_part_num: DataTypes.STRING,
		gift_photo: DataTypes.STRING,
		gift_price: DataTypes.INTEGER,
		gift_purchased: DataTypes.BOOLEAN,
		gift_url: DataTypes.STRING,
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
        timestamps: true,
        underscored: true
    });

	Gifts.associate = (models) => {
		Gifts.belongsToMany(models.Searches, {
			through: 'search_gift_mappings',
			as: 'gifts',
			foreignKey: 'gift_id'
		});
	};


	return Gifts;
};
