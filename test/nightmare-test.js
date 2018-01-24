var Nightmare = require("nightmare");

// STORY: As a developer nerd, I want to be able to take courses on web tech.
// new Nightmare({
//         show: true
//     })
//     // Visit login page
//     .goto("https://gift-hub.herokuapp.com/")
//     // Enter username.
//     .type("#input_user_email", "mntypython74@gmail.com")
//     // Enter password.
//     .type("#input_user_password", "password")
//     // Take a screenshot of the login form.
//     .screenshot("login.png")
//     // Click login button. Always check if you've done this where necessary!
//     // It's easy to forget.
//     .click("#user_login_submit")
//     //waits 3 seconds
//     .wait(3000)
//     // Take a screenshot of the home form.
//     .screenshot("home.png")
//     // Click search link.
//     .click("a[href='/search']")
//     //waits 2 seconds
//     .wait(2000)
//     // Search for nightmare
//     .type("#keyword", "nightmare")
//     //Click search
//     .click("#search-submit-btn")
//     //waits 2 seconds
//     .wait(2000)
//     // Scroll down a few hundred pixels.
//     .scrollTo(175, 0)
//     //waits 2 seconds
//     .wait(2000)
//     // Take a screenshot and save it to the current directory.
//     .screenshot("results.png")
//     //waits 3 seconds
//     .wait(3000)
//     // End test
//     .end()
//     // Execute commands
//     .then(function () {
//         console.log("Done!");
//     })
//     // Catch errors
//     .catch(function (err) {
//         console.log(err);
//     });

new Nightmare({
        show: true
    })
    // Visit register page
    .goto("https://gift-hub.herokuapp.com/register")
    // Enter first name.
    .type("#input_user_firstname", "Sue")
    // Enter last name.
    .type("#input_user_lastname", "May")
    // Enter email.
    .type("#input_user_email", "smayfakeemail@yahoo.com")
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
    .click(".active")
    // wait 2 seconds
    .wait(2000)
    // Enter password.
    .type("#input_user_password", "password")
    // Enter password.
    .type("#input_user_password_confirm", "password")
    // wait 2 seconds
    .wait(2000)
    // Click login button. Always check if you've done this where necessary!
    // It's easy to forget.
    .click("#user_registration_submit")
    // wait 2 seconds
    .wait(2000)
    // Take a screenshot of the regester form.
    .screenshot("registered.png")


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