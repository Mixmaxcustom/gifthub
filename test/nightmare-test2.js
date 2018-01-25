var Nightmare = require("nightmare");

new Nightmare({
    show: true
})
// Visit register page
.goto("https://gift-hub.herokuapp.com/register")
// wait 2 seconds
.wait(2000)
// Enter first name.
.type("#input_user_firstname", "Samantha")
// wait 2 seconds
.wait(2000)
// Enter last name.
.type("#input_user_lastname", "Mayfake")
// wait 2 seconds
.wait(2000)
// Enter email.
.type("#input_user_email", "smayfakeemail@yahoo.com")
// wait 2 seconds
.wait(2000)
// Enter birthday.
.click("#input_user_birthday")
// wait 2 seconds.
.wait(2000)
// Pick Today
.click(".picker__today")
// wait 2 seconds.
.wait(2000)
// Pick OK
.click(".picker__close")
// wait 2 seconds.
.wait(2000)
// Enter city.
.type("#input_user_city", "Portsmouth")
// wait 2 seconds
.wait(2000)
// Choose State
.click(".select-dropdown")
// wait 2 seconds
.wait(2000)
// Choose State
.type(".select-dropdown", "nh")
//wait 1 second
.wait(1000)
// Choose State
.click("li:nth-child(34)")
// Enter password.
.type("#input_user_password", "password")
// Enter password.
.type("#input_user_password_confirm", "password")
// wait 2 seconds
.wait(2000)
// Take a screenshot of the regester form.
.screenshot("registered.png")
// wait 2 seconds
.wait(2000)
// Click login button. Always check if you've done this where necessary!
// It's easy to forget.
.click("#user_registration_submit")
// wait 2 seconds
.wait(2000)
// Take a screenshot of the regester form.
.screenshot("test/images/registered.png")


// End test
.end()
// Execute commands
.then(function () {
    console.log("Done!");
})
// Catch errors
.catch(function (err) {
    console.log(err);
});