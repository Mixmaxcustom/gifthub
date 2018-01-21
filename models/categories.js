// categories table
module.exports = function (sequelize, DataTypes) {
	var Categories = sequelize.define("Categories", {
		category_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		category_name: DataTypes.STRING,
		category_description: DataTypes.STRING,
		category_age_limit: DataTypes.INTEGER
	}, {
        timestamps: true,
        underscored: true
    });

	Categories.associate = (models) => {
		Categories.belongsToMany(models.Gifts, {
			through: 'gift_category_mappings',
			as: 'categories',
			foreignKey: 'category_id'
		});
	};

	Categories.associate = (models) => {
		Categories.belongsToMany(models.Recipients, {
			through: 'recipient_category_mappings',
			as: 'categories',
			foreignKey: 'category_id'
		});
	};

	Categories.associate = (models) => {
		Categories.belongsToMany(models.Searches, {
			through: 'search_category_mappings',
			as: 'categories',
			foreignKey: 'category_id'
		});
	};

	Categories.associate = (models) => {
		Categories.belongsToMany(models.Interests, {
			through: 'interest_category_mappings',
			as: 'categories',
			foreignKey: 'category_id'
		});
	};


	return Categories;
};
