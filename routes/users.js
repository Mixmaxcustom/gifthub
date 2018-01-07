const db = require("../models/");


let pageContent = {
	title: "gifthub", // head title
	projname: "gifthub", // top nav app name
	table: "users",
	admin: false
}


module.exports = function (app) {
	// users list
	app.get("/users", function (req, res) {
		pageContent.pagetitle = "Users";
		pageContent.content = "Search for a user here.";
		db.users.findAll().then(users => {
			pageContent.users = users;
			res.render('users', pageContent);
		})
	});

	// add new user
	app.get("/users/add", function (req, res) {
		pageContent.pagetitle = "Add User";
		pageContent.content = "Add a new user to the database.";
		db.gifts.findAll().then(gifts => {
			pageContent.gifts = gifts;
			res.render('users/add', pageContent);
		})
	});

	// add a new user
	app.post("/users", function (req, res) {
		let userData = req.body;
		db.users.create(userData).then(function (data) {
			// redirect when finished
			res.json({status: "Success", redirect: '/users'});
		});
	});

	// delete user(s)
	app.delete("/users/:user_id", function (req, res) {
        // in the event of multiple ids passed, split them
		let userIDs = req.params.user_id.split(',');
		db.users.destroy({
			where: { user_id: userIDs}}
		).then( data => {
			res.json({status: "Success", redirect: '/users'});
		});
	});
};
