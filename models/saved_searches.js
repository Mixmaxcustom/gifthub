// user searches table
'use strict';

module.exports = function (sequelize, DataTypes) {
	var Searches = sequelize.define("searches", {
		search_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		search_name: DataTypes.STRING ,
		search_description: DataTypes.TEXT,
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE,
	}, {
        timestamps: true,
        underscored: true
	});


	Searches.associate = (models) => {
		Searches.belongsToMany(models.users, {
			through: models.user_search_mappings
		});

		Searches.belongsToMany(models.gifts, {
			through: models.search_gift_mappings
		});
	};


	return Searches;
};
