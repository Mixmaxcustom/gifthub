const db = require("../models/");


module.exports = (app) => {
    // all recipients list
    app.get("/recipients", function(req, res) {
        db.Recipients.findAll().then(recipients => {
            res.json(recipients)
        })
    });

    // add a new recipient screen
    app.get("/add-recipient", function(req, res) {
        db.Recipients.findAll().then(recipients => {
            res.json(recipients)
        })
    });

    // add a new recipient
    app.post("/recipients", (req, res, next) => {
        let userData = (Object.keys(req.query).length > 0) ? req.query : req.body;
        console.log(` - requesting ${req.url}`);
        // add a new recipient
        db.recipients.create(
            userData
        ).then( recipient => {
            // link the recipient
            recipient.addUser(app.content.user.user_id)
            res.status(100).send({message: 'recipient added', redirect: '/profile'})

        }).catch( err => {
            res.status(500);
            res.json({error: err, stackError: err.stack});
        })
    });

    // post a gift to a recipient
    app.post("/save", (req, res, next) => {
        let data = req.body;
        console.log(data);
        res.send(data)
    });
};
