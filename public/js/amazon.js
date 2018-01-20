// amazon api module


$(document).ready(function () {

    console.log(`> loading Amazon API...`);

    // user clicked search button
    $('body').on('click', '#search-submit-btn', event => {

        let searchData = {
            SearchIndex: $('#gift_category_menu').find('option:selected').text(),
            Keywords: $('#keyword').val(),
            MaximumPrice: parseInt($('#max-price').val()) * 100
        }

        // post to amazon
        $.ajax("/amazon", {
            type: "POST",
            data: searchData
        }).done( data => {
            // success
            // console.log(data);

        }).fail( data => {
            // fail
        });
    });
});
