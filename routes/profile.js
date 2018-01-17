const db = require("../models/");


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub",   // top nav app name
}

module.exports = function (app) {
	// user profile
	app.get("/profile", function (req, res) {
        console.log(` - requesting ${req.url}`);

		pageContent.pagetitle = "User Profile";
		pageContent.content = "Mess with your details here.";
		pageContent.is_logged_in = (app.user_data.user_id > 0);
        pageContent.user_firstname = app.user_data.user_firstname || 'none';

		db.users.findOne({
            where: {
                user_id: app.user_data.user_id
              }
        }).then( user => {
            if (user) {
                console.log(user);
                pageContent.user = user;
                res.render('profile', pageContent);
            }
        });
    });

    // get user detail
	app.get("/profile/:user_id", function (req, res) {
        console.log(` - requesting ${req.url}`);
        app.checkUserAuthentication(req);
		pageContent.pagetitle = "Edit User Profile";
		pageContent.content = "Update your details here.";
		pageContent.is_logged_in = (app.user_data.user_id > 0);
        pageContent.user_firstname = app.user_data.user_firstname || 'none';

		db.users.findOne({
            where: {
                user_id: req.params.user_id
              }
        }).then( user => {
            if (user) {
                console.log(user);
                res.render('profile/edit', pageContent);
            }
        });
    });

	// user updated
	app.put("/profile/:user_id", function (req, res) {
		app.checkUserAuthentication(req);
		db.users.update({
			user_firstname: req.body.user_firstname,
			user_lastname: req.body.user_lastname,
			user_email: req.body.user_email,
			user_birthday: req.body.user_birthday,
			user_city: req.body.user_city,
			user_state: req.body.user_state
		}, {
			where: {
				user_id: req.params.user_id
			}
		  }).then(category => {
				res.json({status: "Success", redirect: '/users'});
		  });
	});
}