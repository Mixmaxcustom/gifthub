/* UI Helper Functions */

// document load

var curbutton;
$(document).ready(function () {
	console.log(`> loading user controller...`);

	// gift is added to a user
	$('body').on('click', '.gift-action', event => {
		console.log(`gift action button clicked...`);

		event.preventDefault();
		event.stopPropagation();

		let button = $(event.currentTarget);

		curbutton = button;

		$.ajax("/gift-saved", {
			type: "POST"
		})

		.done( result => {
			console.log(result);

		})

		.fail( data => {
			console.log(data);
		});
	});

	// user clicks on purchased checkbox in recipient card
	$('body').on('click', '.gift-purchased', event => {

		let checkbox = $(event.currentTarget)
		let giftID = checkbox.data().value;
		let isChecked = checkbox.is(':checked')
		curbutton = checkbox;

		$.ajax(`/gift-purchased/${giftID}/${(isChecked == true ? 1 : 0)}`, {
			type: "POST",
		})

		.done( result => {
			console.log(result.message);
		})

		.fail( data => {
			console.log(data);
		});
	});


});
