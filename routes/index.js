const db 	 = require('../models/');
const cookie = require('cookie');
const path      = require('path');
const client    = require('../config/amazon');
const amazon    = require('amazon-product-api');


var ProductCard = function(user_id, asin, title, image, thumbnail, price, detailsURL, description, category) {
    this.user_id = user_id,
    this.gift_id = 0,
    this.asin = asin,
    this.title = title,
    this.image = image,
    this.thumbnail = thumbnail,
    this.price = parseInt(price),
    this.detailsURL = detailsURL,
    this.description = description,
    this.category = category
}


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

    // home page
	app.get("/", (req, res) => {
		console.log(` - requesting ${req.url}`);

		db.categories.findAll().then(categories => {
			app.content.layout = 'main';
			app.content.categories = categories;
            res.render('index', app.content);
		});
	});

    // user login
    app.get("/login", function (req, res) {
        app.content.layout = 'home';
        res.render('login', app.content);
    });

    // check user credentials
    app.post("/login", (req, res, next) => {
        let userData = req.body;

        // TODO: sanity check user

        // look for the current user in the database
        db.users.findOne({
            where: {
                user_email: userData.user_email
              }
        })

        .then( user => {
            // user match in database
            if (user) {
                // user logged in successfully
                if (user.user_password === userData.user_password) {

                    let dbuser = {
                        user_firstname: user.user_firstname,
                        user_lastname: user.user_lastname,
                        user_email: user.user_email,
                        user_id: user.user_id,
                        user_is_admin: user.user_is_admin
                    }

                    // sign and create cookie
                    const token = jwt.sign(dbuser, secret);
                    // res.cookie('gifthub-user', token, { maxAge: 86400 });
                    res.cookie('gifthub-user', token);
                    res.json({ status: 100, redirect: '/' });

                // user is in database, but passwords don't match
                } else {
                    res.json({ status: 403, message: 'incorrect password.', redirect: '/login' });
                }

            // email not found in the database
            } else {
                // res.status(500).json({ error: 'message', redirect: '/login' });
                res.json({ status: 401, message: 'user not in database.', redirect: '/login' });
            }
        })

        .catch(err => {
            res.json(err);
        });
    });

    // user registration
    app.get("/register", function (req, res, next) {
        res.render('register', app.content);
    });

    // check user credentials
    app.post("/register", (req, res, next) => {
        let userData = (Object.keys(req.query).length > 0) ? req.query : req.body;
        console.log(` - requesting ${req.url}`);

        // add a new recipient
        // TODO: need to check that user email isn't registered already
        db.users.create(
            userData
        )

        .then( data => {
            res.status(200);
            res.json({ status: 200, redirect: '/' });
            // res.json(data.get({ plain: true }));
        })

        .catch( err => {
            res.status(500);
            res.json({error: err, stackError: err.stack});
        })
    });

    // user logged out
    app.get("/logout", function (req, res) {
        // reset the page content user
        app.content.user = {
            user_id: -1,
            user_email: null,
            user_firstname: null,
            user_lastname: null,
            user_is_logged_in: false,
            user_is_admin: false
        }

        // clear the cookie
        app.content.layout = 'home';
        res.clearCookie('gifthub-user').render('login', app.content);
    });

    // user profile
	app.get("/profile", (req, res) => {
        console.log(` - requesting ${req.url}`);

        console.log(`- [profile]: searching for user id ${app.content.user.user_id}`);
        console.log(`- [profile]: ${app.content.user.user_is_logged_in}`);

        app.content.recipients = [];

        db.users.findOne({
            where: { user_id: app.content.user.user_id }
        })

        .then( user => {

            console.log(user);


            user.getRecipients().then( recipients => {
                console.log(`- [profile]: found ${recipients.length} recipients...`);


                recipients.forEach( user => {

                    let data = user['dataValues'];
	                let userdata = new Recipient(data.recipient_id, data.recipient_firstname, data.recipient_lastname, data.recipient_title,
												data.recipient_bio, data.recipient_photo, data.recipient_birthday, data.recipient_max_budget,
                                                    data.recipient_city, data.recipient_state);
				console.log(userdata);
                    app.content.recipients.push(userdata);


              })

                res.render('profile', app.content);
           });
        })

        .catch(err => {
            res.json({message: err.stack, redirect: '/'});
        });
	});

	// all recipients list
	app.get("/recipients", function(req, res) {
		db.recipients.findAll().then(recipients => {
			res.json(recipients)
		})
	});

	// add a new recipient screen
	app.get("/add-recipient", function(req, res) {
		db.recipients.findAll().then(recipients => {
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
		)

		.then( recipient => {
			console.log(`- [recipients]: added recipient id ${recipient.recipient_id}`);
			// link the recipient
			recipient.addUser(app.content.user.user_id)
			res.send({ message: 'recipient added', redirect: '/profile'})

		})

		.catch( err => {
			res.status(500).send({ message: err.stack, redirect: '/profile'})
		})
	});

	// post a gift to a recipient
	app.post("/save", (req, res, next) => {
		let data = req.body;
		res.send(data);

	});

	// favorite a gift
	app.post("/favorite", (req, res, next) => {
		let data = req.body;
		console.log(data);



		res.send(data)
	});


    app.get("/amazon", (req, res, next) => {
        console.log(` - requesting ${req.url}`);

        db.categories.findAll().then(categories => {
            app.content.categories = categories;
            res.render('amazon/index', app.content);
        });
    });


    app.post("/amazon", (req, res, next) => {
        console.log(` - posting ${req.url}`);

        // if getting values via url params, query the Request.query
        let isPostman = (Object.keys(req.query).length > 0) ? true : false;
        let searchData = (isPostman === true) ? req.query : req.body;
        let sortBy = (searchData.SearchIndex === 'All') ? null : 'salesrank';


        client.itemSearch({
            SearchIndex: searchData.SearchIndex,
            Keywords: searchData.Keywords,
            MaximumPrice: searchData.MaximumPrice,
            // Hard coded a minimum price so the price result wouldn't error out.
            MinimumPrice: "0001",
            ResponseGroup: 'ItemAttributes,Offers,Images'
        }).then( results => {

            // send results via json if using postman
            if (isPostman === true) {
                res.json(results);
            } else {
                // empty array to capture productCards
                let productCardArr = [];

                // This loops through the specific results i pulled out of the JSON object from the API
                results.forEach((result, i) => {

                    let itemAttributes = results[i].ItemAttributes[0];

                    // Assign desired product info to variables -JR
                    let productAsin = results[i].ASIN[0];
                    let productTitle = results[i].ItemAttributes[0].Title[0];
                    let thumbnailImage = results[i].ImageSets[0].ImageSet[0].TinyImage[0].URL[0];
                    let productImage = results[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
                    // let productPrice = results[i].OfferSummary[0].LowestNewPrice[0].Amount[0];
                    // updating price to show the displayed Amazon price
                    let productPrice = results[i].ItemAttributes[0].ListPrice[0].Amount[0];
                    let productDetailPage = results[i].DetailPageURL[0];

                    let productDescription = (Object.keys(itemAttributes).includes('Feature')) ? itemAttributes.Feature[0] : null;
                    let productCategory = (Object.keys(itemAttributes).includes('ProductGroup')) ? itemAttributes.ProductGroup[0] : null;

                    // Create new productCard for each product using above variables -JR
                    let productCard = new ProductCard(app.content.user.user_id, productAsin, productTitle, productImage, thumbnailImage, productPrice, productDetailPage, productDescription, productCategory);

                    productCardArr.push(productCard);

                    if (app.content.debug_mode === true) {
                        console.log("======== AMAZON API RESULTS " + i + " ===========")
                        console.log("ASIN -        " + productAsin);
                        console.log("Title -       " + productTitle);
                        console.log("Image -       " + productImage);
                        console.log("Price -       " + productPrice);
                        console.log("detail page - " + productDetailPage);
                    }

                    db.gifts.findOrCreate({
                            where: {
                                gift_asin: productAsin
                            }
                        })
                        .spread((gift, created) => {

                            // creating a new gift
                            if (created == true) {
                                db.gifts.update({
                                    gift_name: productTitle,
                                    gift_description: productDescription,
                                    gift_photo: productImage,
                                    gift_price: productPrice,
                                    gift_purchased: false,
                                    gift_url: productDetailPage,
                                    gift_favorite: false

                                }, {
                                    where: { gift_asin: productAsin },
                                    returning: true,
                                    plain: true
                                })
                                .then(result => {
                                    console.log(result);
                                });
                            }
                        });
                });
                // res.status(200).send({products: productCardArr, redirect: '/search'})
                res.status(200).send(productCardArr);
            }

        }).catch(err => {
            // console.log(err[0].Error[0].Message[0]);
            console.log(err);
            res.status(500).send(err);
        });
    });


	// search page
	app.get("/search", (req, res) => {
        console.log(` - requesting ${req.url}`);

		db.categories.findAll().then(categories => {
			app.content.layout = 'main';
			app.content.categories = categories;
			res.render('search', app.content);
		});
	});

	// search results
	app.get("/results", (req, res) => {
		console.log(` - requesting ${req.url}`);

		db.categories.findAll().then(categories => {
			app.content.layout = 'main';
			app.content.categories = categories;
			res.render('search', app.content);
		});
	});

    // all recipients list
    app.get("/events", function(req, res) {
        // look for the current user in the database
        db.events.findAll().then( events => {
            // res.json(events)
            app.content.events = events;
            app.content.pagetitle = 'Events'
            res.render('events', app.content)
        })
    });

    // add a new event screen
    app.get("/add-event", function(req, res) {
        // look for the current user in the database

        db.users.findOne({
            where: {
                user_id: app.content.user.user_id
            }
        })

        db.events.findAll().then( events => {
            res.json(events)
        })
    });

    // add a new recipient
    app.post("/events", (req, res, next) => {
        let eventData = (Object.keys(req.query).length > 0) ? req.query : req.body;

        console.log(` - requesting ${req.url}`);
        console.log(eventData);
        // look for the current user in the database
        db.events.create(
            eventData
        ).then( data => {
            //console.log( recipient.get({plain: true }))
            res.status(200);
            res.json(data.get({ plain: true }));
        }).catch( err => {
            res.status(500);
            res.json({error:error, stackError:error.stack});
        })
    });

};
