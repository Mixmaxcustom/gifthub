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


// validate the registration form
function userRegistrationValidation() {
	const form = document.getElementById("user_registration_form");
	const password = $("#input_user_password").val();
	const passwordConfirm = $("#input_user_password_confirm").val();

	if (form.checkValidity() && (password === passwordConfirm)) {
		return true
	} else {
		$("#input_user_password").addClass('invalid')
		 $("#input_user_password_confirm").addClass('invalid')
		 Materialize.toast('Please enter a valid password')
		return false
	};
};

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
	console.log(`> loading view controller...`);


	// user registration clicked
	$('body').on('click', '#user_registration_submit', event => {

		if (userRegistrationValidation()) {

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


            // TODO: catch error here
			$.post('/register', userData, res => {
				console.log(res);
				// redirect home
				window.location = `/`
			});


		} else {
			console.log('failed validation');
			event.preventDefault();
			event.stopPropagation();
		}
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
			recipient_bio: $('#recipient_bio').val() || null,
			recipient_budget: 0
		}

		console.log(recipient);

		let budgetValue = $('#recipient_budget').val();
		if (budgetValue) {
			recipient.recipient_budget = parseInt(budgetValue)*100
		}

		let birthday = $('#recipient_birthday').val();

		if (birthday) {
			recipient.recipient_birthday = birthday;
		}

		$.ajax("/recipients", {
				type: "POST",
				data: recipient
			})

			.done(results => {
				window.location.reload()
				Materialize.toast(`Recipient added!`, 5000);
			})

			.fail(data => {
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

		console.log(`- [view]: logging in: ${user_email}...`);

		$.post('/login', user, res => {
			console.log(res);

			// redirect home
			window.location = `/`
		});
	});
});
