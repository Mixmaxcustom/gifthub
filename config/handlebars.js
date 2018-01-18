// handlebars helpers
const moment = require('moment');
const Handlebars = require('handlebars');


module.exports = {
    // date formatter
    formatTime: (date, format) => {
        var mmnt = moment(date);
        return mmnt.format(format);
    },

    // date formatter
    obscureYear: (date) => {
        var mmnt = moment(date);
        let shdate = mmnt.format('M/D');
        return `${shdate}/XXXX`;
    },

    component: (partial, options) => {
        const template = Handlebars.compile(Handlebars.partials[partial])
        const html = template(options.hash)
        return new Handlebars.SafeString(html)
      }
};