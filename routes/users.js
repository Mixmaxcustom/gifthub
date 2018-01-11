const db = require("../models/");


let pageContent = {
	title: "gifthub", // head title
	projname: "gifthub", // top nav app name
	table: "users",
	admin: false,
	usercount: 0
}


module.exports = function (app) {
	// all users list
	app.get("/users", function (req, res) {
		// check authentication
		app.checkUserAuthentication(req);
		pageContent.pagetitle = "Users";
		pageContent.content = "Search for a user here.";
		pageContent.is_logged_in = (app.user_data.user_id > 0);
		pageContent.user_firstname = app.user_data.user_firstname || 'none';
		
		let template = (pageContent.is_logged_in == true) ? 'users/index' : 'login';

		db.users.findAll().then(users => {
			pageContent.users = users;
			pageContent.usercount = users.length;
			res.render(template, pageContent);
		})
	});

	// add new user
	app.get("/users/add", function (req, res) {
		// check authentication
		app.checkUserAuthentication(req);
		pageContent.pagetitle = "Add User";
		pageContent.content = "Add a new user to the database.";

		pageContent.is_logged_in = (app.user_data.user_id > 0);
		pageContent.user_firstname = app.user_data.user_firstname || 'none';
		let template = (pageContent.is_logged_in == true) ? 'users/add' : 'login';
		res.render(template, pageContent);
	});

	// user was added
	app.post("/users", function (req, res) {
		let userData = req.body;
		db.users.create(userData).then( user => {
			// redirect when finished
			res.json({status: "Success", redirect: '/users', user: user});
		});
	});

	// get user detail
	app.get("/users/:user_id", function (req, res) {
		let user_id = req.params.user_id;

		pageContent.pagetitle = "Edit User";
		pageContent.content = "Update user details";

		db.users.findOne({where:{user_id:user_id}, include:[{model:categories, as:'categories', where:{is_valid:1, is_vertify:1},   required:false}]}).success(function(result) {
			callback(result);
		});

		db.users.findOne({
            where: {
                user_id: user_id
              }
        }).then( user => {
            if (user) {
				console.log(` - editing user: ${user_id}`);
				pageContent.user = user;
				// res.json({status: "Success", redirect: '/users/edit', pageContent});
				res.render('users/edit', pageContent);
            }
        });
	});

	// user updated
	app.put("/users/:user_id", function (req, res) {
		app.checkUserAuthentication(req);
		db.users.update({
			user_firstname: req.body.user_firstname,
			user_lastname: req.body.user_lastname,
			user_email: req.body.user_email,
			user_birthday: req.body.user_birthday,
			user_bio: req.body.user_bio,
			user_city: req.body.user_city,
			user_state: req.body.user_state
		}, {
			where: {
				user_id: req.params.user_id
			}
		  }).then(user => {
				res.json({status: "Success", redirect: '/users', user: user});
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
