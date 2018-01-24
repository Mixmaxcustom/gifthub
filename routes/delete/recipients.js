const db = require("../models/");


module.exports = (app) => {
    // all recipients list
    app.get("/recipients", function(req, res) {
        db.Recipient.findAll().then(recipients => {
            res.json(recipients)
        })
    });

    // add a new recipient screen
    app.get("/add-recipient", function(req, res) {
        db.Recipient.findAll().then(recipients => {
            res.json(recipients)
        })
    });

    // add a new recipient
    app.post("/recipients", (req, res, next) => {
        let userData = (Object.keys(req.query).length > 0) ? req.query : req.body;
        console.log(` - posting ${req.url}`);
        // add a new recipient
        db.Recipient.create(
            userData
        )

        .then( recipient => {
            console.log(`- [recipients]: added recipient id ${recipient.id}`);
            // link the recipient
            recipient.addUser(app.content.user.user_id)
            res.send({ message: 'recipient added', redirect: '/profile'})

        })

        .catch( err => {
            res.status(500).send({ message: err.stack, redirect: '/profile'})
        })
    });

    // post a gift to a recipient
    app.post("/gift-saved", (req, res, next) => {
        console.log(`saving gift...`);
        res.send({message: 'shut the fuck up'})
    });

    // update status of a gift
    app.post("/gift-purchased/:giftid/:purchased", (req, res, next) => {
        let msg = (req.params.purchased == 1) ? 'purchased' : "didn't purchase"

        console.log(`${msg} gift id: ${req.params.giftid}`);

        db.Gift.findOne({
            where: {
                id: req.params.giftid
            },

            // include recipient and the owning user
            include: [{
                model: db.Recipient
            }]
        })

        .then( gift => {
            gift.update(
                { gift_purchased: true })

                .then( result => {
                    result
                    res.send({message: 'success'})
                })
        })

        .catch(err => {
            res.json(err);
        });
    });
};
