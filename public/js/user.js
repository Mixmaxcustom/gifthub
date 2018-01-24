/* UI Helper Functions */

// document load

var curbutton;
$(document).ready(function () {
	console.log(`> loading user module...`);

	// gift is favorited
	$('body').on('click', '.favorite-gift-button', event => {
		event.preventDefault();
		event.stopPropagation();

		let button = $(event.currentTarget)
		let productASIN = button.attr('aisn');
		curbutton = button;
		console.log(`Amazon ID: ${productASIN}`);

		$.ajax("/favorite", {
			type: "POST",
			data: {aisn: productASIN}
		})

		.done( result => {
			console.log(result);
		})

		.fail( data => {
			console.log(data);
		});
	});

	// gift is added to a user
	$('body').on('click', '.add-gift-button', event => {
		event.preventDefault();
		event.stopPropagation();

		let button = $(event.currentTarget)
		let productASIN = button.attr('aisn');
		curbutton = button;
		console.log(`Amazon ID: ${productASIN}`);

		$.ajax("/save", {
			type: "POST",
			data: {aisn: productASIN}
		})

		.done( result => {
			console.log(result);

		})

		.fail( data => {
			console.log(data);
		});
	});

	// user clicks on purchased checkbox in recipient card
	$('body').on('click', '#gift-purchased', event => {
		// event.preventDefault();
		// event.stopPropagation();

		let button = $(event.currentTarget)
		let productASIN = button.data().value;
		curbutton = button;
		console.log(`Amazon ID: ${productASIN}`);

		$.ajax("/save", {
			type: "POST",
			data: {id: productASIN, gift_purchased: true}
		})

		.done( result => {
			console.log(result);

		})

		.fail( data => {
			console.log(data);
		});
	});


});

