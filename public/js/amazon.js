// amazon api module
$(document).ready(function () {

    console.log(`# Loading Amazon API module...`);

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
            data: searchData
        }).done( data => {

            $('#json-output').removeClass('hide');
            $('#json-response').val(JSON.stringify(data, null, 4));
        });
    });

    $('body').on('click', '.code-format', event => {
        console.log(`code clicked...`);
        $('.code-format').select();
    });
});



