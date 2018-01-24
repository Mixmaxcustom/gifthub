
// editable table

$(function() {

    $('#api-users-table').editableTableWidget({
        cloneProperties: ['background', 'border', 'outline']
    });
    $('#textAreaEditor').editableTableWidget({editor: $('<textarea>')});
    window.prettyPrint && prettyPrint();
});
