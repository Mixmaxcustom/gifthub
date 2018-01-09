const db = require("../models/");


let pageContent = {
	title: "gifthub",   // head title
	projname: "gifthub-api",   // top nav app name
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

    // edit user profile
	app.get("/profile/edit", function (req, res) {
        console.log(` - requesting ${req.url}`);
        app.readAuthenticationCookie(req);
		pageContent.pagetitle = "Edit User Profile";
		pageContent.content = "Update your details here.";
		pageContent.is_logged_in = (app.user_data.user_id > 0);
        pageContent.user_firstname = app.user_data.user_firstname || 'none';

		db.users.findOne({
            where: {
                user_id: app.user_data.user_id
              }
        }).then( user => {
            if (user) {
                console.log(user);
                res.render('profile/edit', pageContent);
            }
        });
    });
}
