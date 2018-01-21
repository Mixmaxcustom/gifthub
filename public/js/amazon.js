// amazon api module


$(document).ready(function () {

    console.log(`> loading Amazon API...`);

    let resultsroot = $('#search-results');

    // user clicked search button
    $('body').on('click', '#search-submit-btn', event => {

        var searchIndex = $('#gift_category_menu').find('option:selected').data().value || 'All';

        let searchData = {
            SearchIndex: searchIndex,
            Keywords: $('#keyword').val(),
            MaximumPrice: parseInt($('#max-price').val())
        }

        resultsroot.empty();

        // post to amazon
        $.ajax("/amazon", {
            type: "POST",
            data: searchData,
            traditional: true
        }).done( products => {

            products.forEach( data => {
                let card = new GiftCard(data);
                resultsroot.append($(card.html));
            });



        }).fail( (xhr, status) => {
            Materialize.toast(`Error: ${status}`, 10000)
        });
    });
});


/*
// set the index, then re-init
$("#gift_category_menu").val(2);
$("#gift_category_menu").material_select();
*/



class GiftCard {
    constructor(data) {
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
            `<div class="card">` +
            `<div class="card-image waves-effect waves-block waves-light crop">` +
            `<a target="_blank" href="${this.detailsURL}" class="btn-floating btn-large btn-price waves-effect waves-light accent-4 teal">${this.formattedPrice}</a>` +
            // `<a href="#"><img class="responsive-img object-fit_fill" src="${this.image}" alt="item-img"></a>` +
            `<a href="#"><img src="${this.image}" alt="item-img"></a>` +
            `</div>` +
            `<ul class="card-action-buttons">` +
            `<li><a class="btn-floating waves-effect waves-light teal lighten-3"><i class="material-icons">add_circle</i></a></li>` +
            `<li><a class="btn-floating waves-effect waves-light teal lighten-2"><i class="material-icons">favorite</i></a></li>` +
            `<li><a class="btn-floating waves-effect waves-light teal lighten-1"><i class="material-icons activator">info_outline</i></a></li>` +
            `</ul>` +
            `<div class="card-content">` +
            `<div class="row">` +
            `<div class="col s12">` +
            `<p class="card-title grey-text text-darken-4">` +
            `<a href="#" class="grey-text text-darken-4">${this.title}</a>` +
            `</p>` +
            `</div></div>` +
            `<div class="row">` +
            `<div class="col s12">` +
            `<div class="chip">${this.category}</div>` +
            `</div></div></div>` +
            `<div class="card-reveal">` +
            `<span class="card-title grey-text text-darken-4">` +
            `<i class="material-icons right">close</i>${this.title}</span>` +
            `<p>${this.description}</p>` +
            `</div></div></div>`
        return output
    }
}
