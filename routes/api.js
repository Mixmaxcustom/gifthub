// api routes
const db 	= require("../models/");
// let dbdata = (Object.keys(req.query).length > 0) ? req.query : req.body;

module.exports = (app) => {
	app.get("/api", (req, res) => {

		console.log(` - requesting ${req.url}`);
        app.content.layout = 'api'
		res.render('api/index', app.content);
	});
};
