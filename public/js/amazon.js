// amazon api module

var recentlySearchedProducts = [];


$(document).ready(function () {
    console.log(`> loading Amazon API...`);

    let resultsroot = $('#search-results');
    $("#gift_category_menu").material_select();

    // user clicked search button
    $('body').on('click', '#search-submit-btn', event => {

        recentlySearchedProducts = [];

        var searchIndex = `All`;
        let selectedValue = $('#gift_category_menu').find('option:selected').data();
        if (selectedValue) {
            searchIndex = selectedValue.value;
        }

        let searchData = {
            SearchIndex: searchIndex,
            Keywords: $('#keyword').val(),
            MaximumPrice: parseInt($('#max-price').val())
        }

        // empty the search div
        resultsroot.empty();


        $.ajax("/amazon", {
            type: "POST",
            data: searchData,
            traditional: true
        }).done( products => {

            products.forEach( data => {
                // TODO: amazon AISN error here
                // console.log(Object.keys(data));
                let card = new GiftCard(data);
                console.log(card);
                recentlySearchedProducts.push(card);
                resultsroot.append($(card.html));
            });


        // status is text
        }).fail( (xhr, status) => {
            //["readyState", "getResponseHeader", "getAllResponseHeaders", "setRequestHeader", "overrideMimeType", "statusCode", "abort", "state", "always", "catch", "pipe", "then", "promise", "progress", "done", "fail", "responseText", "responseJSON", "status", "statusText"]
            // ["readyState", "getResponseHeader", "getAllResponseHeaders", "setRequestHeader", "overrideMimeType", "statusCode", "abort", "state", "always", "catch", "pipe", "then", "promise", "progress", "done", "fail", "responseText", "responseJSON", "status", "statusText"]
            // console.log(xhr.responseJSON[0].Error[0].Message[0]);
            // let errmsg = xhr.responseJSON.Error[0].Message[0];

            Materialize.toast(`Error: ${status}`, 10000)
        });
    });
});




// gift card object used to render search results
class GiftCard {
    constructor(data) {
        this.id = data.gift_id,
        this.UserId = data.UserId,
        this.asin = data.asin,
        this.title = data.title,
        this.image = data.image,
        this.price = data.price,
        this.detailsURL = data.detailsURL,
        this.description = data.description || 'No description available',
        this.category = data.category
    }

    get formattedPrice() {
        return '$' + (this.price / 100).toFixed(2);
    }
    // output html
    get html() {
        let output =
        `<div class="item product">` +
        `<div class="card medium">` +
        `<div class="card-image waves-effect waves-block waves-light crop">` +
        `<a target="_blank" href="${this.detailsURL}" class="btn-floating btn-large btn-price waves-effect waves-light accent-4 teal">${this.formattedPrice}</a>` +
        `<a href="#"><img src="${this.image}" alt="item-img"></a>` +
        `</div>` +
        `<ul class="card-action-buttons">` +
        `<li><a data-value="${this.asin}" data-action="add-gift" class="btn-floating gift-action-add waves-effect waves-light teal lighten-3"><i class="material-icons">add_circle</i></a></li>` +
        `<li><a data-value="${this.asin}" data-action="favorite-git" class="btn-floating gift-action-favorite waves-effect waves-light teal lighten-2"><i class="material-icons">favorite</i></a></li>` +
        `<li><a aisn="${this.asin}" class="btn-floating waves-effect waves-light teal lighten-1"><i class="material-icons activator">info_outline</i></a></li>` +
        `</ul>` +
        `<div class="card-content">` +
        `<div class="row">` +
        `<div class="col s12">` +
        `<p class="card-title grey-text text-darken-4">` +
        `<a href="#" class="grey-text text-darken-4 truncate" alt="${this.title}">${this.title}</a>` +
        `</p>` +
        `</div>` +
        `</div>` +
        `<div class="row">` +
        `<div class="col s12">` +
        `<div class="chip">${this.category}</div>` +
        `</div>` +
        `</div>` +
        `</div>` +
        `<div class="card-reveal">` +
        `<span class="card-title grey-text text-darken-4">` +
        `<i class="material-icons right">close</i>${this.title}</span>` +
        `<p>${this.description}</p>` +
        `</div>` +
        `</div>` +
        `</div>`
        return output
    }
}
