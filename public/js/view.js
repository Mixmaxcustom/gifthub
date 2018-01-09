/* UI Helper Functions */

// initialize the states menu
function setupStateMenu() {
    let statesmenu = $('#input-user-state');
    var curstate = statesmenu.find(":selected").text();
    console.log(`selected: ${curstate}`);
    
    if (statesmenu) {
        statesmenu.empty();
        statesmenu.append($(`<option selected>Choose...</option>`));
        allStates.forEach(state => {
            statesmenu.append($(`<option date-value="${state}">${state}</option>`));
        })
    }


}

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
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// globals
var currentUserID;
var currentGiftID;
var currentCategoryID;


// document load
$(document).ready(function () {
    console.log(`Loading view module...`);

    // create the states menu
    setupStateMenu();

    // add user form submitted
    $("#add-user-submit").on("click", event => {
        event.preventDefault();
        var newUser = {
            user_firstname: $('#input-user-firstname').val(),
            user_lastname: $('#input-user-lastname').val(),
            user_email: $('#input-user-email').val(),
            user_birthday: $('#input-user-birthday').val(),
            user_city: $('#input-user-city').val(),
            user_state: $('#input-user-state').val(),
            user_login: $('#input-user-login').val(),
            user_password: $('#input-user-password').val()
        };

        $.post("/users", newUser)
            .done(data => {
                // redirect to users page
                window.location = data.redirect
            });
    });

    // category edited
    $("#edit-user-submit").on("click", event => {
        event.preventDefault();
        let button = $(event.currentTarget);
        let user_id = button.data().value;
        
        var newUser = {
            user_firstname: $('#input-user-firstname').val(),
            user_lastname: $('#input-user-lastname').val(),
            user_email: $('#input-user-email').val(),
            user_birthday: $('#input-user-birthday').val(),
            user_city: $('#input-user-city').val(),
            user_state: $('#input-user-state').val()
            // user_login: $('#input-user-login').val(),
            // user_password: $('#input-user-password').val()
        };

        $.ajax("/users/" + user_id, {
            type: "PUT",
            data: newUser
            }).done( data => {
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

    // category edited
    $("#edit-category-submit").on("click", event => {
        event.preventDefault();
        let button = $(event.currentTarget);
        let category_id = button.data().value;
        
        var newCategory = {
            category_name: $('#input-category-name').val(),
            category_description: $('#input-category-description').val(),
        };

        $.ajax("/categories/" + category_id, {
            type: "PUT",
            data: newCategory
            }).done( data => {
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
            gift_url: $('#input-gift-url1').val().trim()
        };

        $.post("/gifts", newGift)
            .done( data => {
                window.location = data.redirect
            });
    });

    // gift entry updated
    $("#edit-gift-submit").on("click", event => {
        event.preventDefault();
        var newGift = {
            gift_name: $('#input-gift-name').val().trim(),
            gift_description: $('#input-gift-description').val().trim(),
            gift_model_num: $('#input-gift-model-num').val().trim(),
            gift_manufacturer: $('#input-gift-manufacturer').val().trim(),
            gift_photo: $('#input-gift-photo').val().trim(),
            gift_price: $('#input-gift-price').val(),
            gift_url: $('#input-gift-url1').val().trim()
        };

        $.post("/gifts", newGift)
            .done( data => {
                window.location = data.redirect
            });
    });

    // user login clicked
    $("#user-login-submit").on("click", event => {
        event.preventDefault();

        let userData = {
            user_login: $('#input-user-login').val(),
            user_password: b64EncodeUnicode($('#input-user-password').val())
        }
        // console.log(userData);
        $.post("/login", userData)
            .done( data => {
                // console.log(data);
                if (data.redirect) {
                    window.location = data.redirect;
                } else {
                    $('#login-error-alert').removeClass('d-none');
                    $('#user-login-error').text(' ' + data.message);
                }
            });
    });

    // remove error alert when user clicks in the login field
    $("#input-user-login").on("focus", event => {
        $('#login-error-alert').addClass('d-none');
    });

    // table row selection highlighting
    $('.detail-table').on('click', 'tbody tr', event => {
        let selrow = $(event.currentTarget);
        let rowid = selrow.data().value;
        let route = $("table.detail-table").attr('url-routing');

        selrow.addClass('selected').siblings().removeClass('selected');
        
        $('.detail-edit-button').removeClass('disabled');
        $('.detail-delete-button').removeClass('disabled');

        // set the edit button url dynamically
        $('.detail-edit-button').attr('href', `${route}/${rowid}`);
    });

    // search text changed
    $("#detail-search-form").on('change keyup paste', function() {
        let searchval = $('#detail-search-form').val();
    });

    // delete row button clicked
    $('.detail-delete-button').on("click", event => {
        event.preventDefault();

        let route = $("table.detail-table").attr('url-routing');
        let rowid = $("table.detail-table tr.selected").data().value;
        
        $.ajax({
            method: "DELETE",
            url: `/${route}/${rowid}`,
        }).done(data => {
            // redirect to users page
            window.location = data.redirect
        });
    });
});


const allStates = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN",
    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV",
    "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"
];
