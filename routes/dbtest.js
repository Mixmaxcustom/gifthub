// database response test
const db 	= require("../models/");


module.exports = (app) => {
	app.get("/test", (req, res, next) => {
		console.log(` - requesting ${req.url}`);
		res.render('dbtest')
	});
};
