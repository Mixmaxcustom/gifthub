const db = require("../models/");


module.exports = (app) => {
	// user profile
	app.get("/profile", (req, res) => {
        console.log(` - requesting ${req.url}`);
		res.render('profile', app.pageContent);
	});
	
};
