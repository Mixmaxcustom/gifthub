// amazon api module

// format a float for passing to Amazon
Number.prototype.__defineGetter__('amazonPrice', function () {
    // return (parseInt(this * 100));

    if (!this % 1 === 0) {
        return (parseInt(this) / 100).toFixed(2);
    };
    return this.toFixed(2);
});

// format an Amazon price
Number.prototype.__defineGetter__('priceFormatted', function () {
    if (this % 1 === 0) {
        return (parseInt(this) / 100).toFixed(2);
    };
    return this.toFixed(2);
});


$(document).ready(function () {

    console.log(`> loading Amazon API...`);

    // user clicked login button
    $('body').on('click', '#submit-btn', event => {
        console.log(`# Querying Amazon...`);

        let searchData = {
            SearchIndex: $('#gift-category').val(),
            Keywords: $('#keyword').val(),
            MaximumPrice: parseInt($('#max-price').val()) * 100
        }

        $.ajax("/amazon", {
            type: "POST",
            data: searchData,
            traditional: true
        }).done(productInfoObject => {
            // Unique console.log message here to confirm AJAX receipt of object -JR
            console.log("This is the data: " + productInfoObject);
            console.log(productInfoObject);

            //------Do something with "productInfoObject" here------

            // $('#json-output').removeClass('hide');
            // $('#json-response').val(JSON.stringify(data, null, 4));
        });
    });

    $('body').on('click', '.code-format', event => {
        console.log(`code clicked...`);
        $('.code-format').select();
    });
});