// amazon api module
$(document).ready(function () {

    console.log(`# Loading Amazon API module...`);

    // user clicked login button
    $('body').on('click', '#submit-btn', event => {
        console.log(`Searching...`);

        let searchData = {
            category: $('#gift-category').val(),
            keyword: $('#keyword').val(),
            max_price: $('#max-price').val()
        }

        $.ajax("/amazon", {
            type: "POST",
            data: searchData
        }).done(data => {
            // do something with data
        });

    });
});