const db        = require('../models/');
const express   = require('express');
const router    = express.Router();


console.log(Object.keys(db));

router.get('/', (req, res) => {
    res.json({message: 'Please query a table...'})
});


router.get('/users', (req, res) => {
    db.User.findAll()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.json(err);
    })
});



router.get('/users/:UserId', (req, res) => {
    console.log(`user id: ${req.params.UserId}`);
    db.User.findOne({
        where: {
            id: req.params.UserId
        },
        include: [{
            model: db.Recipient,
                attributes: ['recipient_title', 'recipient_firstname', 'recipient_lastname', 'recipient_lastname', 'recipient_budget']
        }]
    })

    .then( data => {
        res.json(data);
    })

    .catch( err => {
        res.json(err);
    })
});



router.get('/gifts', (req, res) => {
    db.Gift.findAll()
    .then(gifts => {
        res.json(gifts);
    })
    .catch(err => {
        res.json(err);
    })
});


router.get('/recipients', (req, res) => {
    db.Recipient.findAll()
    .then(recipients => {
        res.json(recipients);
    })
    .catch(err => {
        res.json(err);
    })
});


router.get('/events', (req, res) => {
    db.Event.findAll()
    .then(events => {
        res.json(events);
    })
    .catch(err => {
        res.json(err);
    })
});

router.get('/categories', (req, res) => {
    db.Category.findAll()
    .then(categories => {
        res.json(categories);
    })
    .catch(err => {
        res.json(err);
    })
});

// create

router.post('/users', (req, res) => {
    let data = (Object.keys(req.query).length > 0) ? req.query : req.body;
    db.User.create(
        data
    )
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.json(err);
    })
});



module.exports = router;
