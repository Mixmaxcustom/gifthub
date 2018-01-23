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
        statesmenu.append($(`<option selected>State</option>`));
        allStates.forEach(state => {
            statesmenu.append($(`<option date-value="${state}">${state}</option>`));
        })
        statesmenu.val(selected_state);
    }
    $('select').material_select();
}


// document start
(function($) {
    $(function() {

        $('.button-collapse').sideNav();

        console.log(`> initializing Materialize...`);

        //Dropdowns
        $('select').material_select();

        //Side Nav - Landing Page
        // Initialize collapse button
        // $(".button-collapse").sideNav();
        // $('.button-collapse').sideNav('hide');
        $('.button-collapse').sideNav({
            'edge': 'left'
        });

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
        $('.materialboxed').materialbox();

        $('.chat-collapse').sideNav('hide');
        $('.chat-collapse').sideNav({
            menuWidth: 300,
            edge: 'right',
        });


        $('.chips').material_chip();
        $('.chips-initial').material_chip({
            data: [{
                tag: 'Apple',
            }, {
                tag: 'Microsoft',
            }, {
                tag: 'Google',
            }],
        });

        $('.chips-placeholder').material_chip({
            placeholder: 'Enter a tag',
            secondaryPlaceholder: '+Tag',
        });

        $('.chips-autocomplete').material_chip({
            autocompleteOptions: {
                data: {
                    'Apple': null,
                    'Microsoft': null,
                    'Google': null
                },
                limit: Infinity,
                minLength: 1
            }
        });

        // initialize the amazon category menu
        $("#gift_category_menu").val(1);
        $("#gift_category_menu").material_select();

    }); // end of document ready
})(jQuery); // end of jQuery name space
