// user searches table
module.exports = function (sequelize, DataTypes) {
	var saved_searches = sequelize.define("saved_searches", {
		search_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		search_name: DataTypes.STRING ,
		search_description: DataTypes.TEXT,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	});
	return saved_searches;
};
