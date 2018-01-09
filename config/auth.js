// user authentication
module.exports = function (app) {
    // base64 encode a string 
    app.b64EncodeUnicode = function(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    }
        
    // decode a base64-encoded string
    app.b64EncodeUnicode = function(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    // read user authentication
    app.readAuthenticationCookie = function(req) {
        app.user_data = req.cookies['gifthub-user'] || { user_firstname: null, user_login: null, user_id: -1 };
        // decodeURIComponent(req.headers.cookie)  // need to split on '='
        // console.log(app.user_data);
		app.user_data = (typeof app.user_data == "string") ? JSON.parse(app.user_data) : app.user_data;
    };
}

