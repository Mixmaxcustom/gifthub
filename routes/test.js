const db = require("../models/");


module.exports = (app) => {
    // user profile
    app.get("/test", (req, res) => {
        console.log(` - requesting ${req.url}`);


        db.users.findAll({
            include: [{
                model: db.user_event_mapping,
				as: 'events',
                through: {
                    attributes: ['user_id']
                }
            }]
        }).then( users => {
			app.pageContent.users = users;
			res.render('test/index', app.pageContent);
		})
    });
};
