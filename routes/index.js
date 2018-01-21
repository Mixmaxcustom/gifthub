const db 	 = require('../models/');
const cookie = require('cookie');


module.exports = (app) => {
	// home page
	app.get("/", (req, res) => {
		console.log(` - requesting ${req.url}`);

		db.Categories.findAll().then(categories => {
			app.pageContent.layout = 'main';
			app.pageContent.categories = categories;
            res.render('index', app.pageContent);
		});
	});
};
