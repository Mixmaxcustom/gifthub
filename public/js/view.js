/* UI Helper Functions */


// encode a string to base64
function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		function toSolidBytes(match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
}

// decode a base64-encoded string
function b64DecodeUnicode(str) {
	// Going backwards: from bytestream, to percent-encoding, to original string.
	return decodeURIComponent(atob(str).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}


// validate the recipient registration form
function validateUserRegistrationForm() {
	console.log(`# validating recipient registration...`);
}


// yep, these are globals
var currentUserID;
var currentGiftID;
var currentCategoryID;


// document load
$(document).ready(function () {
	console.log(`> loading view module...`);


	// user registration clicked
	$('body').on('click', '#user_registration_submit', event => {
		event.preventDefault();
		event.stopPropagation();
		let button = $(event.currentTarget);
		validateUserRegistrationForm();
	});

	// recipient registration clicked
	$('body').on('click', '#recipient_registration_submit', event => {
		event.preventDefault();
		event.stopPropagation();


		let recipient = {
			recipient_title: $('#recipient_title').val(),
			recipient_firstname: $('#recipient_firstname').val() || null,
			recipient_lastname: $('#recipient_lastname').val() || null,
			recipient_birthday: $('#recipient_birthday').val() || null,
			recipient_city: $('#recipient_city').val() || null,
			recipient_state: $('#recipient_state').val() || null,
			recipient_email: $('#recipient_email').val() || null,
			recipient_bio: $('#recipient_email').val() || null
		}

		console.log(recipient);

		$.ajax("/recipients", {
			type: "POST",
			data: recipient
		}).done( results => {
			console.log(results);

			if (data.status == 100) {
				// window.location = data.redirect;
				console.log(`added user!`);

			} else if (data.status > 400) {
				console.log(`Error: ${res.message}`);
			}
		});
	});

	// user clicked login button
	$('body').on('click', '#user_login_submit', event => {
		event.preventDefault();
		event.stopPropagation();
		let user_email = $('#input_user_email').val();
		let user_password = $('#input_user_password').val();

		let user = {
			user_email: user_email,
			user_password: b64EncodeUnicode(user_password)
		}

		$.ajax("/login", {
			type: "POST",
			data: user
		}).done(data => {
			console.log(`data`);

			if (data.status == 100) {
				window.location = data.redirect;

			} else if (data.status > 400) {
				$('#card-login-alert').removeClass('hide');
				$('#login-error-msg').text(data.message);
			}
		});
	});

});


const allRelationships = ['husband', 'wife', 'father', 'mother', 'son', 'sister', 'mother-in-law', 'father-in-law', 'brother']

/*
// launch search results modal
$('#search-results-modal').modal('open');

// selected category category_name
('#gift_category_menu').find(":selected").data();

// selected category category_id
('#gift_category_menu').find(":selected").val();

Materialize.toast('I am a toast!', 4000)

*/
