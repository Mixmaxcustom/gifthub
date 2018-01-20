// amazon api module

// format a float for passing to Amazon
Number.prototype.__defineGetter__('amazonPrice', function () {
    // return (parseInt(this * 100));

    if (!this % 1 === 0) {
        return (parseInt(this) / 100).toFixed(2);
    }; return this.toFixed(2);
});

// format an Amazon price
Number.prototype.__defineGetter__('priceFormatted', function () {
    if (this % 1 === 0) {
        return (parseInt(this) / 100).toFixed(2);
    }; return this.toFixed(2);
});


$(document).ready(function () {

    console.log(`> loading Amazon API...`);

    // user clicked search button
    $('body').on('click', '#search-submit-btn', event => {
        $('#search-results-modal').modal('open');
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
            // $('#json-response').text(JSON.stringify(data, null, 4));
        });
    });

    // close the search results
    $('body').on('click', '#search-results-close', event => {
        $('#search-results-modal').modal('close');
    });
});
