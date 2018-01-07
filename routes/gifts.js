const db = require("../models/");


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub",   // top nav app name
}

module.exports = function (app) {
	// gifts list
	app.get("/gifts", function (req, res) {
		console.log(` - requesting ${req.url}`);
		pageContent.pagetitle = "Gifts";
		pageContent.content = "Browse products here.";
		db.gifts.findAll().then(gifts => {
			pageContent.gifts = gifts;
			res.render('gifts', pageContent);
		})
	});

	// add new gift
	app.get("/gifts/add", function (req, res) {
		console.log(` - requesting ${req.url}`);
		pageContent.pagetitle = "Add Gift";
		pageContent.content = "Submit a new gift idea";
		db.gifts.findAll().then(gifts => {
			pageContent.gifts = gifts;
			res.render('gifts/add', pageContent);
		})
	});

	// add a new gift
	app.post("/gifts", function (req, res) {
		console.log(` - posting ${req.url}`);
		let giftData = req.body;
		db.gifts.create(giftData, 
		).then(function(data) {
			// redirect when finished
			res.json({status: "Success", redirect: '/gifts'});
		});
	});
};
