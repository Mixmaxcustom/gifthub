// categories table
module.exports = function (sequelize, DataTypes) {
	var Categories = sequelize.define("categories", {
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
		Categories.belongsToMany(models.gifts, {
			through: 'gift_category_mappings',
			as: 'categories',
			foreignKey: 'category_id'
		});
	};

	Categories.associate = (models) => {
		Categories.belongsToMany(models.recipients, {
			through: 'recipient_category_mappings'
		});
	};

	Categories.associate = (models) => {
		Categories.belongsToMany(models.searches, {
			through: 'search_category_mappings'
		});
	};

	Categories.associate = (models) => {
		Categories.belongsToMany(models.interests, {
			through: 'interest_category_mappings'
		});
	};


	return Categories;
};
