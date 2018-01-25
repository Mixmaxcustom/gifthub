/* Users Controller  */


function openRecipientsModal() {
	$('#recipients-list-modal').modal('open');
}


// open the edit recipient dialog and fill initial values
function openRecipientEditModal(data) {
	$('#recipient-edit-submit').attr('data-value', data.id);
	$('#recipient_title_edit').val(data.recipient_title);
	$('#recipient_firstname_edit').val(data.recipient_firstname);
	$('#recipient_lastname_edit').val(data.recipient_lastname);
	$('#recipient_birthday_edit').val(data.recipient_birthday);
	$('#recipient_email_edit').val(data.recipient_email);
	$('#recipient_city_edit').val(data.recipient_city);
	$('#recipient_bio_edit').val(data.recipient_bio);

    // amazon -> dollars conversion
	if (data.recipient_budget) {
		let budgetInDollats = parseInt(data.recipient_budget) / 100;
		$('#recipient_budget_edit').val(budgetInDollats);
	}

	// amazon -> dollars conversion
	if (data.recipient_state) {
		$('#recipient_state_edit').val(data.recipient_state);
		$('#recipient_state_edit').material_select();
	}

	Materialize.updateTextFields();
	$('#edit-recipient-modal').modal('open');
}


// open the edit recipient dialog and fill initial values
function openUserEditModal(data) {
	$('#user-edit-submit').attr('data-value', data.id);
	$('#user-edit-firstname').val(data.user_firstname);
	$('#user-edit-lastname').val(data.user_lastname);
	$('#user-edit-email').val(data.user_email);
	$('#user-edit-password').val(data.user_password);
	$('#user-edit-password-confirm').val(data.user_password);
	$('#user-edit-city').val(data.user_city);

    // amazon -> dollars conversion
	if (data.recipient_budget) {
		let budgetInDollats = parseInt(data.recipient_budget) / 100;
		$('#recipient_budget_edit').val(budgetInDollats);
	}

	// amazon -> dollars conversion
	if (data.user_state) {
		$('#user-edit-state').val(data.user_state);
		$('#user-edit-state').material_select();
	}

	Materialize.updateTextFields();
	$('#edit-user-modal').modal('open');
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



function updateRecipients(msg=null) {
	var updatemsg = `updating`;
	if (msg) {
		updatemsg += `: ${msg}...`;
	}
	Materialize.toast(updatemsg, 4000);
}



$(document).ready(function () {
	console.log(`> loading user controller...`);

	// gift is added to a user
	$('body').on('click', '.gift-action-add', event => {

		event.preventDefault();
		event.stopPropagation();

		let button = $(event.currentTarget);
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

		event.preventDefault();
		event.stopPropagation();

		let button = $(event.currentTarget);
		curbutton = button;
		let giftAction = button.attr('data-action');
		let giftID = button.data().value;

		$('#recipients-list-modal').find('a.recipient-list-check').each((i, checkbox) => {
			$(checkbox).attr('gift-id', giftID)
		});


		Materialize.toast(`Adding gift to favorites`, 4000)
	});


	// recipient clicked in the list (gift added to recpient)
	$('body').on('click', '.recipient-list-check', event => {
		let button = $(event.currentTarget)
		let recipId = button.data().value;
		let aisn = button.attr(`gift-id`);

		let checkState = button.find('i').text();
		let newState = (checkState === 'check_box') ? 'crop_din' : 'check_box';

		let routeAction = (checkState === 'check_box') ? 'gift-added' : 'gift-removed';
		button.find('i').text(newState);

		$.ajax(`/${routeAction}/${aisn}/${recipId}`, {
			type: "POST",
		})

		.done( result => {
			console.log(result.message);
			updateRecipients(result.message)
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
			if (result.status == 200) {

				let spentAmount = '$' + parseInt(result.spent) / 100
				let budgetTotal = '$' + parseInt(result.budget) / 100

				$(`#spent-total-${result.recipientId}`).text(spentAmount);
				$(`#budget-total-${result.recipientId}`).text(budgetTotal);
			}
		})

		.fail( data => {
			Materialize.toast(`Error purchasing gift!`);
			console.log(data);
		});
	});

	// user deletes a gift from the recipient list
    // DOES BUDGET CALC HERE
	$('body').on('click', '.delete-gift-button', event => {

		let closebox = $(event.currentTarget)
		let giftID = closebox.data().value;

        // remove the card
		closebox.parents().find('#saved-gift-collection').remove()

		$.ajax(`/gift-removed/${giftID}`, {
			type: "POST",
		})

		.done( result => {
			if (result.status == 200) {
				Materialize.toast(`removed item at row: ${result.row}`);
				window.location = '/profile'
			}
		})

		.fail( data => {
			Materialize.toast(`Error removing gift!`);
			console.log(data);
		});
	});


	// user edits a recipient
	$('body').on('click', '.edit-recipient-button', event => {
		event.preventDefault();
		event.stopPropagation();

		let editbutton = $(event.currentTarget)
		let recipientID = editbutton.data().value;

		$.ajax(`/recipient/${recipientID}`, {
			type: "GET",
		})

		.done( recipient => {
			openRecipientEditModal(recipient)
		})
	});



	// user edits a recipient
	$('body').on('click', '#recipient-edit-submit', event => {
		event.preventDefault();
		event.stopPropagation();

		let editbutton = $(event.currentTarget)
		let recipientID = editbutton.data().value;

		let recipient = {
			recipient_title: $('#recipient_title_edit').val(),
			recipient_firstname: $('#recipient_firstname_edit').val() || null,
			recipient_lastname: $('#recipient_lastname_edit').val() || null,
			recipient_email: $('#recipient_email_edit').val() || null,
			recipient_bio: $('#recipient_bio_edit').val() || null,
			recipient_budget: 0
		}

		let budgetValue = $('#recipient_budget_edit').val();
		if (budgetValue) {
			// amazon -> dollars conversion
			recipient.recipient_budget = parseInt(budgetValue) * 100
		}


		let birthday = $('#recipient_birthday_edit').val();
		if (birthday) {
			recipient.recipient_birthday = birthday;
		}


		$.ajax(`/recipient/${recipientID}`, {
			type: "POST",
			data: recipient
		})

		.done( result => {
			window.location = `/profile`
		})
	});

	// user profile edit
	$('body').on('click', '#open-user-profile', event => {
		event.preventDefault();
		event.stopPropagation();

		let editbutton = $(event.currentTarget)
		let userID = getUserID()

		$.ajax(`/user/${userID}`, {
			type: "GET",
		})

		.done( user => {
			openUserEditModal(user)
		})


		console.log(`editing user profile...`);
		$('#edit-user-modal').modal('open');

	});


	// user edits their profile
	$('body').on('click', '#user-edit-submit', event => {
		event.preventDefault();
		event.stopPropagation();

		let editbutton = $(event.currentTarget)
		let userID = editbutton.data().value;

		let user = {
			user_firstname: $('#user-edit-firstname').val() || null,
			user_lastname: $('#user-edit-lastname').val() || null,
			user_email: $('#user-edit-email').val() || null,
			user_password: $('#user-edit-password').val() || null,
			user_city: $('#user-edit-city').val() || null,
			user_state: $('#user-edit-state').val() || null
		}

		console.log(`user: ${JSON.stringify(user)}`);

		$.ajax(`/user/${userID}`, {
			type: "POST",
			data: user
		})

		.done( result => {
			window.location = `/profile`
		})
	});


});
