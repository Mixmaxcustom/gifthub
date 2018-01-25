// page content init module

// globals for page rendering
let content = {
    layout: 'main',
    projname: 'gifthub',
    pagetitle: '',
    favicon: process.env.PROD_FAVICON_NAME || 'favicon-dev',
    search_modal_title: 'Search Results',
    debug_mode: false,
    searchData: {
        seachCategory: null,
        results: []
    },
    user: {
        user_id: -1,
        user_email: null,
        user_firstname: null,
        user_lastname: null,
        user_is_logged_in: false,
        user_is_admin: false
    }
};


// base64 encode a string
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


module.exports = function (app) {
    app.b64EncodeUnicode = b64EncodeUnicode;
    app.b64DecodeUnicode = b64DecodeUnicode;
    app.content = content;
};
