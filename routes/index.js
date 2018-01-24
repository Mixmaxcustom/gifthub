const db 	 = require('../models/');
const cookie = require('cookie');


module.exports = (app) => {
	// home page
	app.get("/", (req, res) => {
		console.log(` - requesting ${req.url}`);

		db.Category.findAll().then(categories => {
			app.content.layout = 'main';
			app.content.categories = categories;
            res.render('index', app.content);
		});
	});
};
