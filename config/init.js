// page content init module

// globals for page rendering
var pageContent = {
    layout: 'main',
    projname: 'gifthub',
    pagetitle: '',
    search_modal_title: 'Search Results',
    user: {
        user_id: -1,
        user_email: null,
        user_firstname: null,
        is_logged_in: false
    }
};


module.exports = function (app) {
    app.pageContent = pageContent;
};