const db = require("../models/");


// recipient constructor
function Recipient(id, title, firstname, lastname, budget, bio, photo, birthday ) {
    this.id = id,
    this.firstname = firstname,
    this.lastname = lastname,
    this.title = title,
    this.bio = bio,
    this.photo = photo,
    this.birthday = birthday,
    this.budget = budget,
    this.gifts = []
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


Recipient.prototype.currentTotal = function() {
    var total = 0;
    this.gifts.forEach( gift => {
        total += gift.gift_price;
    })
    return total / 100;
};



module.exports = (app) => {
    // user profile
    app.get("/profile", (req, res) => {
        console.log(` - requesting ${req.url}`);

        console.log(`- [profile]: searching for user id ${app.content.user.user_id}`);
        console.log(`- [profile]: ${app.content.user.user_is_logged_in}`);


        var results = [];
        db.User.findOne({
            where: {
                    id: app.content.user.user_id
                },
                include: [{
                    model: db.Recipient,
                    attributes: ['id', 'recipient_title', 'recipient_firstname', 'recipient_lastname', 'recipient_lastname', 'recipient_budget', 'recipient_bio',
                                'recipient_photo', 'recipient_birthday', 'recipient_budget', 'recipient_city', 'recipient_state'],
                    include: [{
                        model: db.Gift,
                        attributes: ['id', 'gift_name', 'gift_description', 'gift_asin', 'gift_part_num', 'gift_url', 'gift_photo', 'gift_price', 'gift_purchased', 'gift_favorite']
                    }]
                }]
            })

            .then( user => {

                let thisUser = user.dataValues;
                let recipients = thisUser.Recipients;  /* array */

                recipients.forEach(recipient => {

                    let rdata = recipient.dataValues;
                    let robj = new Recipient(rdata.recipient_id, rdata.recipient_title, rdata.recipient_firstname, rdata.recipient_lastname,
                                             rdata.recipient_budget, rdata.recipient_bio, rdata.recipient_photo, rdata.recipient_birthday)


                    rdata.Gifts.forEach( gift => {
                        console.log(gift.dataValues);
                        robj.gifts.push (gift.dataValues)
                    })

                    results.push(robj);
                })

                app.content.recipients = results;
                // render the page
                res.render('profile', app.content);
            })

            .catch(err => {
                res.json({message: err});
            })
    });
};
