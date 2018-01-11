// handlebars helpers
const moment = require('moment');

module.exports = {
    // date formatter
    formatTime: function(date, format){
        var mmnt = moment(date);
        return mmnt.format(format);
    },

    // date formatter
    obscureYear: function(date){
        var mmnt = moment(date);
        let shdate = mmnt.format('M/D');
        return `${shdate}/XXXX`;
    }
}