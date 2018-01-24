const db 			= require("../models/");
const path 			= require('path');
const client 		= require('../config/amazon');
const amazon 		= require('amazon-product-api');


var ProductCard = function(asin, title, image, thumbnail, price, detailsURL, description, category) {
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


module.exports = (app) => {
	app.get("/amazon", (req, res, next) => {
		console.log(` - requesting ${req.url}`);

		db.Category.findAll().then( categories => {
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
			MinimumPrice: "0500",
			ResponseGroup: 'ItemAttributes,Offers,Images'
		}).then( results => {
            console.log(`results: ${results.length}`);
            console.log(results);
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
                    var productPrice;

                    try {
                        productPrice = results[i].ItemAttributes[0].ListPrice[0].Amount[0];
                    } catch(error) {
                        productPrice = results[i].OfferSummary[0].LowestNewPrice[0].Amount[0];
                    } finally {
                        productPrice = 0;
                    }

					let productDetailPage = (results[i].DetailPageURL.length > 0) ? results[i].DetailPageURL.length[0] : "";
                    let productDescription = (Object.keys(itemAttributes).includes('Feature')) ? itemAttributes.Feature[0] : null;
                    let productCategory = (Object.keys(itemAttributes).includes('ProductGroup')) ? itemAttributes.ProductGroup[0] : null;

					// Create new productCard for each product using above variables -JR
					let productCard = new ProductCard(productAsin, productTitle, productImage, thumbnailImage, productPrice, productDetailPage, productDescription, productCategory);

					// Push new productCard to the productCardArray -JR
					productCardArr.push(productCard);

					if (app.content.debug_mode === true) {
						console.log("======== AMAZON API RESULTS " + i + " ===========")
						console.log("ASIN -        " + productAsin);
						console.log("Title -       " + productTitle);
						console.log("Image -       " + productImage);
						console.log("Price -       " + productPrice);
						console.log("detail page - " + productDetailPage);
					}

            });

            // res.status(200).send({products: productCardArr, redirect: '/search'})
            res.status(200).send(productCardArr);
        };

        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    });
};
