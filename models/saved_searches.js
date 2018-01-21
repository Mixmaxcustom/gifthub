// user searches table
module.exports = function (sequelize, DataTypes) {
	var Searches = sequelize.define("Searches", {
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
		Searches.belongsToMany(models.Users, {
			through: 'user_search_mappings',
			as: 'searches',
			foreignKey: 'search_id'
		});
	};

	return Searches;
};
