
const db = require('../models/')



module.exports = function (app) {
	// api home
	app.get("/api", function (req, res) {
		app.pageContent.layout = 'api';
		res.render('api/index', app.pageContent);
	});

};

