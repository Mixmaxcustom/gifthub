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

		let userData = {
			user_firstname: $('#input_user_firstname').val(),
			user_lastname: $('#input_user_lastname').val() || null,
			user_password: $('#input_user_password').val() || null,
			user_email: $('#input_user_email').val() || null,
			user_birthday: $('#input_user_birthday').val() || null,
			user_city: $('#input_user_city').val() || null,
			user_state: $('#input_user_state').val() || null
		}

        // has password on the client side
		if (userData.user_password != null) {
			userData.user_password = b64EncodeUnicode(userData.user_password)
		}

		$.ajax("/register", {
			type: "POST",
			data: userData
		})

		.done( user => {
			if (user.status == 100) {
				console.log(`added user id: ${user.user_id}`);
			}
		})

		.fail( data => {
			console.log(data);
		});
	});

	// recipient registration clicked
	$('body').on('click', '#recipient_registration_submit', event => {
		event.preventDefault();
		event.stopPropagation();

		let recipient = {
			recipient_title: $('#recipient_title').val(),
			recipient_firstname: $('#recipient_firstname').val() || null,
			recipient_lastname: $('#recipient_lastname').val() || null,
			recipient_city: $('#recipient_city').val() || null,
			recipient_state: $('#recipient_state').val() || null,
			recipient_email: $('#recipient_email').val() || null,
			recipient_bio: $('#recipient_email').val() || null,
			recipient_max_budget: 0
		}

		let budgetValue = $('#recipient_max_budget').val();
		if (budgetValue) {
			recipient.recipient_max_budget = parseInt(budgetValue)
		}

		let birthday = $('#recipient_birthday').val();
		if (birthday) {
			recipient.recipient_birthday = birthday;
		}

		$.ajax("/recipients", {
			type: "POST",
			data: recipient
		})

		.done( results => {
			window.location.reload()
			Materialize.toast(`Recipient added!`, 5000);
		})

		.fail( data => {
			console.log('fail');
			console.log(data);
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
		})

		.done(data => {
			console.log(`data`);

			if (data.status == 100) {
				window.location = data.redirect;

			} else if (data.status > 400) {
				$('#card-login-alert').removeClass('hide');
				$('#login-error-msg').text(data.message);
			}
		})
		.fail( data => {
			console.log('fail');
			console.log(data);
		});
	});

});
