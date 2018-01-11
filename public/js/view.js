/* UI Helper Functions */

// initialize the states menu
function setupStateMenu() {
    let statesmenu = $('#input-user-state');
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
}

// filter detail tables; hack for now
function filterTableResults(table, value) {
    table.find('tr').each((i, item) => {
        let spantext = $(item).text().trim().toLowerCase();
        // console.log(`span: ${spantext}`);

        if (spantext.match(value.toLowerCase())) {
            $(item).removeClass('d-none');
        } else {
            $(item).addClass('d-none')
        }
    });
}

// password validation on user form
// TODO: not finished
function validateUserForm() {
    console.log(`validating...`);
    var is_valid = true;
    let pinput1 = $('#input-user-password');
    let pinput2 = $('#input-user-password-confirm');

    if (pinput2.length > 0) {
        let pword1 = pinput1.val();
        let pword2 = pinput2.val();

        if (pword1 != pword2) {
            is_valid = false;
            $('#input-user-password').addClass('is-invalid');
            $('#input-user-password-confirm').addClass('is-invalid');
        }
    }
    return is_valid;
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

// yep, these are globals
var currentUserID;
var currentGiftID;
var currentCategoryID;


// document load
$(document).ready(function() {
    console.log(`Loading view module...`);

    // create the states menu
    setupStateMenu();


    /* USERS */

    // add user form submitted
    $("#add-user-submit").on("click", event => {
        event.preventDefault();
        event.stopPropagation();

        if (validateUserForm() === true) {

            var newUser = {
                user_firstname: $('#input-user-firstname').val(),
                user_lastname: $('#input-user-lastname').val(),
                user_email: $('#input-user-email').val(),
                user_birthday: $('#input-user-birthday').val(),
                user_bio: $('#input-user-bio').val(),
                user_city: $('#input-user-city').val(),
                user_state: $('#input-user-state').val(),
                user_password: b64EncodeUnicode($('#input-user-password').val())
            };

            $.post("/users", newUser)
                .done(data => {
                    // redirect to users page
                    window.location = data.redirect
                });
        }
    });

    // category edited
    $("#edit-user-submit").on("click", event => {
        event.preventDefault();

        // query the submit button pressed & get the user id
        let button = $(event.currentTarget);
        let user_id = button.data().value;

        var newUser = {
            user_firstname: $('#input-user-firstname').val(),
            user_lastname: $('#input-user-lastname').val(),
            user_email: $('#input-user-email').val(),
            user_birthday: $('#input-user-birthday').val(),
            user_bio: $('#input-user-bio').val(),
            user_city: $('#input-user-city').val(),
            user_state: $('#input-user-state').val()
        };

        $.ajax("/users/" + user_id, {
            type: "PUT",
            data: newUser
        }).done(data => {
            window.location = data.redirect
        });
    });

    /* CATEGORIES */

    // new gift category added
    $("#add-category-submit").on("click", event => {
        event.preventDefault();

        var newCategory = {
            category_name: $('#input-category-name').val(),
            category_age_limit: parseInt($('#input-category-age-limit').val()) || 0,
            category_description: $('#input-category-description').val()
        };

        $.post("/categories", newCategory)
            .done(data => {
                window.location = data.redirect
            });
    });

    // category edited
    $("#edit-category-submit").on("click", event => {
        event.preventDefault();

        // query the submit button pressed & get the category id
        let button = $(event.currentTarget);
        let category_id = button.data().value;

        var categoryData = {
            category_name: $('#input-category-name').val(),
            category_age_limit: parseInt($('#input-category-age-limit').val()) || 0,
            category_description: $('#input-category-description').val(),
        };
        // FIXME
        $.ajax("/categories/" + category_id, {
            type: "PUT",
            data: categoryData
        }).done(data => {
            window.location = data.redirect
        });
    });

    /* GIFT ITEMS */

    // new gift item added
    $("#add-gift-submit").on("click", event => {
        event.preventDefault();
        var newGift = {
            gift_name: $('#input-gift-name').val(),
            gift_description: $('#input-gift-description').val(),
            gift_model_num: $('#input-gift-model-num').val(),
            gift_manufacturer: $('#input-gift-manufacturer').val(),
            gift_photo: $('#input-gift-photo').val(),
            gift_price: $('#input-gift-price').val(),
            gift_url: $('#input-gift-url1').val()
        };

        $.post("/gifts", newGift)
            .done(data => {
                window.location = data.redirect
            });
    });

    // gift entry updated
    $("#edit-gift-submit").on("click", event => {
        event.preventDefault();

        // query the submit button pressed & get the gift id
        let button = $(event.currentTarget);
        let gift_id = button.data().value;

        var giftData = {
            gift_name: $('#input-gift-name').val(),
            gift_description: $('#input-gift-description').val(),
            gift_model_num: $('#input-gift-model-num').val(),
            gift_manufacturer: $('#input-gift-manufacturer').val(),
            gift_photo: $('#input-gift-photo').val(),
            gift_price: $('#input-gift-price').val(),
            gift_url: $('#input-gift-url1').val()
        };

        $.ajax("/gifts/" + gift_id, {
            type: "PUT",
            data: giftData
        }).done(data => {
            window.location = data.redirect
        });
    });

    /* VENDORS */

    // new vendor added
    $("#add-vendor-submit").on("click", event => {
        event.preventDefault();
        var newVendor = {
            vendor_name: $('#input-vendor-name').val(),
            vendor_description: $('#input-vendor-description').val(),
            vendor_url: $('#input-vendor-url').val()
        };

        $.post("/vendors", newVendor)
            .done(data => {
                window.location = data.redirect
            });
    });

    // vendor updated
    $("#edit-vendor-submit").on("click", event => {
        event.preventDefault();

        // query the submit button pressed & get the vendor id
        let button = $(event.currentTarget);
        let vendor_id = button.data().value;

        var vendorData = {
            vendor_name: $('#input-vendor-name').val(),
            vendor_description: $('#input-vendor-description').val(),
            vendor_url: $('#input-vendor-url').val()
        };

        $.ajax("/vendors/" + vendor_id, {
            type: "PUT",
            data: vendorData
        }).done(data => {
            window.location = data.redirect
            console.log(data.vendor);
        });
    });

    /* LOGIN */

    // user login clicked
    $("#user-login-submit").on("click", event => {
        event.preventDefault();

        let userData = {
            user_email: $('#input-user-email').val(),
            user_password: b64EncodeUnicode($('#input-user-password').val())
        }
        // console.log(userData);
        $.post("/login", userData)
            .done(data => {
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


    // search text events
    $("#detail-search-form").on('change keyup paste', function() {
        let searchval = $('#detail-search-form').val();

        let detail_table = $('.detail-table');
        if (detail_table.length > 0) {
            let routing = $('.detail-table').attr('url-routing');
            // todo: custom router?
            // todo: get live text after redirect
            filterTableResults(detail_table, searchval)
        }
    });

    // clear the text if escape is pressed
    $('#detail-search-form').on('keydown', function(event) {

        // kill return presses
        if(event.which == 13) {
            event.preventDefault();
            event.stopPropagation();
        };

        if(event.which == 27) {
            $('#detail-search-form').val('');
        };
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
