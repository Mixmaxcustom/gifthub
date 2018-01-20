const db = require("../models/");


module.exports = (app) => {
	// user profile
	app.get("/search", (req, res) => {
        console.log(` - requesting ${req.url}`);
		res.render('search', app.pageContent);
	});
};
