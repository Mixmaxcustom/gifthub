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
		console.log(button.attr('userid'));

		curbutton = button;
		let productData = button.parent().closest('div.item.product').data().value;
		productData = JSON.parse(productData.split(`'`).join(`"`));
		console.log(productData);

		$.ajax("/save", {
			type: "POST",
			data: productData
		})

		.done( result => {
			if (result.status == 100) {
				console.log(`success!`);
			}
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
		console.log(button.attr('userid'));

		let productData = button.parent().closest('div.item.product').data().value;
		productData = JSON.parse(productData.split(`'`).join(`"`));
		console.log(productData);


		$.ajax("/save", {
			type: "POST",
			data: productData
		})

		.done( result => {
			if (result.status == 100) {
				console.log(`success!`);
				window.location.reload()
			}
		})

		.fail( data => {
			console.log(data);
		});
	});

});
