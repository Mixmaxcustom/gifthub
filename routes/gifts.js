const db = require("../models/");


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub-api",   // top nav app name
	table: "gifts",
	admin: false,
	giftcount: 0
}

module.exports = function (app) {
	// gifts list
	app.get("/gifts", function (req, res) {
		console.log(` - requesting ${req.url}`);
		app.readAuthenticationCookie(req);
		pageContent.pagetitle = "Gifts";
		pageContent.content = "Browse products here.";
		pageContent.is_logged_in = (app.user_data.user_id > 0);
        pageContent.user_firstname = app.user_data.user_firstname || 'none';
		db.gifts.findAll().then(gifts => {
			pageContent.gifts = gifts;
			pageContent.giftcount = gifts.length;
			res.render('gifts', pageContent);
		})
	});

	// add new gift
	app.get("/gifts/add", function (req, res) {
		console.log(` - requesting ${req.url}`);
		app.readAuthenticationCookie(req);

		pageContent.pagetitle = "Add Gift";
		pageContent.content = "Submit a new gift idea";
		pageContent.is_logged_in = (app.user_data.user_id > 0);
		pageContent.user_firstname = app.user_data.user_firstname || 'none';
		
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

	// get gift detail
	app.get("/gifts/:gift_id", function (req, res) {
		let gift_id = req.params.gift_id;
		app.readAuthenticationCookie(req);

		pageContent.pagetitle = "Edit Gift";
		pageContent.content = "Change gift details";


		db.gifts.findOne({
            where: {
                gift_id: gift_id
              }
        }).then( gift => {
            if (gift) {
				pageContent.gift = gift;
				res.render('gifts/edit', pageContent);
            }
        });
	});

	// gift edited
	app.put("/gifts/:gift_id", function (req, res) {
		console.log(` - putting ${req.url}`);
		let gift_id = req.params.gift_id;
		app.readAuthenticationCookie(req);
		let giftData = req.body;
		
		db.gifts.update({
			gift_name: req.body.gift_name,
			category_description: req.body.category_description
		}, {
			where: {
				category_id: req.params.category_id
			}
		  }).then(category => {
				res.json({status: "Success", redirect: '/categories'});
		  });
	});


	// delete gift
	app.delete("/gifts/:gift_id", function (req, res) {
		// in the event of multiple ids passed, split them
		let giftid = req.params.gift_id.split(',');
		db.gifts.destroy({
			where: { gift_id: giftid}}
		).then( data => {
			res.json({status: "Success", redirect: '/gifts'});
		});
	});
};
