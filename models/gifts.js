// gifts table
'use strict';

module.exports = function (sequelize, DataTypes) {
	var Gifts = sequelize.define("gifts", {
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
		Gifts.belongsToMany(models.searches, {
			through: models.search_gift_mappings
		});
	};


	return Gifts;
};
