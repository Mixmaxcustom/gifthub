/* UI Helper Functions */

// document load
var curbutton;    // CLEANUP


function openRecipientsModal() {
	$('#recipients-list-modal').modal('open');
}


function openConfirmModal(title, body) {
	$('#confirmation-model').modal('open');
}




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




$(document).ready(function () {
	console.log(`> loading user controller...`);

	// gift is added to a user
	$('body').on('click', '.gift-action-add', event => {
		console.log(`adding gift to recipient...`);

		event.preventDefault();
		event.stopPropagation();

		let button = $(event.currentTarget);
		curbutton = button;
		let giftAction = button.attr('data-action');
		let giftID = button.data().value;

		$('#recipients-list-modal').find('a.recipient-list-check').each((i, checkbox) => {
			$(checkbox).attr('gift-id', giftID)
		});

        // open the recipients modal
		openRecipientsModal();
	});

	// gift is saved to a list
	$('body').on('click', '.gift-action-favorite', event => {
		console.log(`adding gift to list...`);

		event.preventDefault();
		event.stopPropagation();

		let button = $(event.currentTarget);
		curbutton = button;
		let giftAction = button.attr('data-action');
		let giftID = button.data().value;

		$('#recipients-list-modal').find('a.recipient-list-check').each((i, checkbox) => {
			$(checkbox).attr('gift-id', giftID)
		});

		// open the recipients modal
		openRecipientsModal();
	});


	// recipient clicked in the list (gift added to recpient)
	$('body').on('click', '.recipient-list-check', event => {
		let button = $(event.currentTarget)
		let recipId = button.data().value;
		let aisn = button.attr(`gift-id`);

		curbutton = button;
		button.find('i').text('check_box');
		$.ajax(`/gift-added/${aisn}/${recipId}`, {
			type: "POST",
		})

		.done( result => {
			console.log(result.message);

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
			console.log(result);
		})

		.fail( data => {
			console.log(data);
		});
	});

	// user deletes a gift from the recipient list
	$('body').on('click', '.delete-gift-button', event => {

		let closebox = $(event.currentTarget)
		let giftID = closebox.data().value;
		curbutton = closebox;

        // remove the card
		closebox.parents().find('#saved-gift-collection').remove()
		$.ajax(`/gift-removed/${giftID}`, {
			type: "POST",
		})

		.done( result => {
			if (result.status == 200) {
				Materialize.toast(`removed item at row: ${result.row}`)
			}
		})

		.fail( data => {
			console.log(data);
		});
	});


});
