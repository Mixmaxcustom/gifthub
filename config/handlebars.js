// handlebars helpers
const moment = require('moment');
const Handlebars = require('handlebars');


module.exports = {
    // date formatter
    formatTime: (date, format) => {
        if (date == null) {
            return "no birthdate"
        }
        var mmnt = moment(date);
        return mmnt.format(format);
    },

    // date formatter
    obscureYear: (date) => {
        var mmnt = moment(date);
        let shdate = mmnt.format('M/D');
        return `${shdate}/XXXX`;
    },

    // date formatter
    obscurePassword: (pword) => {
        return pword.split('').map( c => { return '*'}).join('')
    },

    // price formatter
    formatPrice: (price) => {
        return (price / 100).toFixed(2);
    },

    // price formatter
    shortPrice: (price) => {
        return parseInt(price) / 100;
    },

    component: (partial, options) => {
        const template = Handlebars.compile(Handlebars.partials[partial])
        const html = template(options.hash)
        return new Handlebars.SafeString(html)
      }
};
