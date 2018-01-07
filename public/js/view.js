/* UI Helper Functions */

// initialize the states menu
function setupStateMenu() {
    let statesMenu = $('#input-user-state');
    if (statesMenu) {
        statesMenu.empty();
        statesMenu.append($(`<option selected>Choose...</option>`));
        allStates.forEach(state => {
            statesMenu.append($(`<option date-value="${state}">${state}</option>`));
        })
    }
}

// document load
$(document).ready(function () {
    console.log(`Loading view module...`);

    // create the states menu
    setupStateMenu();

    // add user form submitted
    $("#add-user-submit").on("click", function (event) {
        event.preventDefault();
        var newUser = {
            user_firstname: $('#input-user-firstname').val().trim(),
            user_lastname: $('#input-user-lastname').val().trim(),
            user_email: $('#input-user-email').val().trim(),
            user_birthday: $('#input-user-birthday').val().trim(),
            user_city: $('#input-user-city').val().trim(),
            user_state: $('#input-user-state').val().trim(),
            user_login: $('#input-user-login').val().trim(),
            user_password: $('#input-user-password').val().trim()
        };

        $.post("/users", newUser)
            .done(data => {
                // redirect to users page
                window.location = data.redirect
            });
    });

    // delete user clicked
    $("#delete-user-button").on("click", event => {
        console.log($(this));
        console.log(event);
        var userIDs = [];
        // query checked boxes
        $('input[id="admin-user-name-check"]:checked').each(function () {
            userIDs.push($(this).data().value);
        });

        event.preventDefault();
        $.ajax({
            method: "DELETE",
            url: "/users/" + userIDs,
        }).done(data => {
            // redirect to users page
            window.location = data.redirect
        });
    });

    // new gift category added
    $("#add-category-submit").on("click", event => {
        event.preventDefault();
        var newCategory = {
            category_name: $('#input-category-name').val().trim(),
            category_description: $('#input-category-description').val().trim()
        };

        $.post("/categories", newCategory)
            .done(data => {
                window.location = data.redirect
            });
    });

    // new gift item added
    $("#add-gift-submit").on("click", event => {
        event.preventDefault();
        var newGift = {
            gift_name: $('#input-gift-name').val().trim(),
            gift_description: $('#input-gift-description').val().trim(),
            gift_model_num: $('#input-gift-model-num').val().trim(),
            gift_manufacturer: $('#input-gift-manufacturer').val().trim(),
            gift_photo: $('#input-gift-photo').val().trim(),
            gift_price: $('#input-gift-price').val(),
            gift_url1: $('#input-gift-url1').val().trim()
        };

        $.post("/gifts", newGift)
            .done( data => {
                window.location = data.redirect
            });
    });

    $(".form-check-input").on("click", event => {
        let checkbox = $(event.currentTarget);
        console.log(checkbox);
    });
});


const allStates = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN",
    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV",
    "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"
];
