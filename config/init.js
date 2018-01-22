// page content init module

// globals for page rendering
var content = {
    layout: 'main',
    projname: 'gifthub',
    pagetitle: '',
    favicon: process.env.PROD_FAVICON_NAME || 'favicon-oval-128x128-dev',
    search_modal_title: 'Search Results',
    debug_mode: false,
    user: {
        user_id: -1,
        user_email: null,
        user_firstname: null,
        user_lastname: null,
        user_is_logged_in: false,
        user_is_admin: false
    },
    searchData: {
        seachCategory: null,
        results: []
    }
};


module.exports = function (app) {
    app.content = content;
};
