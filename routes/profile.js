const db = require("../models/");


module.exports = function (app) {
	// user profile
	app.get("/profile", (req, res) => {
        console.log(` - requesting ${req.url}`);
		res.render('profile', app.pageContent);
	});
	

	// user settings
	app.get("/profile/settings", (req, res) => {
		console.log(` - requesting ${req.url}`);
		res.render('profile/settings', app.pageContent);
	});
};
