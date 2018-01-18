// materialize initialization module


const allStates = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN",
	"KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV",
	"NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"
];


// initialize the states menu
function setupStateMenu() {
	let statesmenu = $('#input_user_state');
	// var curstate = statesmenu.find(":selected").text();
	if (statesmenu.length > 0) {
		let selected_state = statesmenu.data().value;
		statesmenu.empty();
		statesmenu.append($(`<option selected>Choose...</option>`));
		allStates.forEach(state => {
			statesmenu.append($(`<option date-value="${state}">${state}</option>`));
		})
		statesmenu.val(selected_state);
	}
	$('select').material_select();
}




$(document).ready(function () {

	console.log(`# Loading materialize initialization module...`);

	//Dropdowns
	$('select').material_select();

	//Side Nav - Landing Page
	// Initialize collapse button
	$(".button-collapse").sideNav();
	$('.button-collapse').sideNav('hide');

	//Modal Dialog for profile page
	// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();

	//Modal Dialog Date Picker
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 100,
		today: 'Today',
		clear: 'Clear',
		close: 'Ok',
		closeOnSelect: false // Close upon selecting a date,
	});


	// initialize text fields
	Materialize.updateTextFields();
	$('select').material_select();
	setupStateMenu();

	$(".dropdown-button").dropdown({
        hover: false
	});
	
	$('ul.tabs').tabs();
});