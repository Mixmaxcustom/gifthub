const express = require("express");
const path = require('path');
var amazon = require('amazon-product-api');
const client = require('../config/amazon.js');
const db = require("../models/");

// My contructor i started messing with.
const ProductCard = require("../amazon-product-card");

module.exports = (app) => {
	app.get("/amazon", (req, res, next) => {
		console.log(` - requesting ${req.url}`);


		db.categories.findAll().then(categories => {
			app.pageContent.categories = categories;
			res.render('amazon/index', app.pageContent);
		});
	});

	app.post("/amazon", (req, res, next) => {
		console.log(` - posting ${req.url}`);

		// if getting values via url params, query the Request.query
		let searchData = (Object.keys(req.query).length > 0) ? req.query : req.body;

		client.itemSearch({
			searchIndex: searchData.category,
			keywords: searchData.keyword,
			maximumPrice: searchData.max_price,
			// Hard coded a minimum price so the price result wouldn't error out.
			minimumPrice: "0001",
			responseGroup: 'ItemAttributes,Offers,Images'
		}).then(results => {

			console.log(`   - getting results...`);
			//=================================================================================================
			// In the array the only number that changes is in results.  IE: results[0], results["2"], etc.
			// Some items don't have UPCs or part numbers so it causes the loop to error out.
			//=================================================================================================

			// Empty array to capture productCards -JR
			let productCardArr = [];

			// This loops through the specific results i pulled out of the JSON object from the API.
			for (var i = 0; i < results.length; i++) {

				// Console log product "i" information for testing - this can probably go once we're in production -JR
				console.log("======== AMAZON API RESULTS " + i + " ===========")

				console.log("ASIN - " + results[i].ASIN[0]);
				// console.log("Part Number - " + results[i].ItemAttributes[0].PartNumber[0]); // Not all items have UPCs or part numbers.
				console.log("Title - " + results[i].ItemAttributes[0].Title[0]);
				console.log("Image - " + results[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0]);
				console.log("Price - " + results[i].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0])
				console.log("detail page - " + results[i].DetailPageURL[0]);

				// Assign desired product info to variables -JR
				let productAsin = results[i].ASIN[0];
				let productTitle = results[i].ItemAttributes[0].Title[0];
				let productImage = results[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
				let productPrice = results[i].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
				let productDetailPage = results[i].DetailPageURL[0];

				// Create new productCard for each product using above variables -JR
				let productCard = new ProductCard(productAsin, productTitle, productImage, productPrice, productDetailPage);

				// Push new productCard to the productCardArray -JR
				productCardArr.push(productCard);

			};

			// Send the productCardArray to the client as JSON -JR
			// Need to use ".send" instead of ".json", or AJAX wont capture response -JR
			res.status(200).send(productCardArr);

		}).catch(err => {
			console.log(err[0].Error[0].Message[0]);
			res.json(err);
		});
	});
};