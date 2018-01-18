const db = require("../models/");
const cookie = require('cookie');


module.exports = function (app) {
	// home page
	app.get("/user/home", (req, res) => {
		console.log(` - requesting ${req.url}`);
		console.log(app.pageContent);
		res.render('user/home', app.pageContent);
	});
};
