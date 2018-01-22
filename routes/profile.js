const db = require("../models/");


// recipient constructor
function Recipient(id, firstname, lastname, title, bio, photo=null, birthday=null, max_budget=0, city=null, state=null) {
    this.id = id,
    this.firstname = firstname,
    this.lastname = lastname,
    this.title = title,
    this.bio = bio,
	this.photo = photo,
	this.birthday = birthday,
	this.max_budget = max_budget
};

Recipient.prototype.name = function() {
	var result = this.title;
	if (this.firstname) {
		result = this.firstname

		if (this.lastname) {
			result += ` ${this.lastname}`
		}
	}
    return result;
};



module.exports = (app) => {
	// user profile
	app.get("/profile", (req, res) => {
        console.log(` - requesting ${req.url}`);

        console.log(`- [profile]: searching for user id ${app.content.user.user_id}`);
        console.log(`- [profile]: ${app.content.user.user_is_logged_in}`);

        app.content.recipients = [];
        db.users.findOne({
            where: { user_id: app.content.user.user_id }
        }).then( user => {
            user.getRecipients().then( recipients => {
                console.log(`- [profile]: found ${recipients.length} recipients...`);


                recipients.forEach( user => {

                    let data = user['dataValues'];
	                let userdata = new Recipient(data.recipient_id, data.recipient_firstname, data.recipient_lastname,data.recipient_title,
												data.recipient_bio, data.recipient_photo, data.recipient_birthday, data.recipient_max_budget,
                                                    data.recipient_city, data.recipient_state);
				console.log(userdata);
                    app.content.recipients.push(userdata);


              })

                res.render('profile', app.content);
           });
        });
	});
};
