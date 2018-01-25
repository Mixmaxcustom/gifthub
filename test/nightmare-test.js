var Nightmare = require("nightmare");

// STORY: As a developer nerd, I want to be able to take courses on web tech.
new Nightmare({
        show: true
    })
    // Visit login page
    .goto("https://gift-hub.herokuapp.com/")
    // Enter username.
    .type("#input_user_email", "mntypython74@gmail.com")
    // Enter password.
    .type("#input_user_password", "password")
    // Take a screenshot of the login form.
    .screenshot("test/images/login.png")
    // Click login button. Always check if you've done this where necessary!
    // It's easy to forget.
    .click("#user_login_submit")
    //waits 3 seconds
    .wait(3000)
    // Take a screenshot of the home form.
    .screenshot("test/homepage.png")
    // Click search link.
    .click("a[href='/search']")
    //waits 2 seconds
    .wait(2000)
    // Search for nightmare
    .type("#keyword", "iPhone X")
    //Click search
    .click("#search-submit-btn")
    //waits 2 seconds
    .wait(2000)
    // Scroll down a few hundred pixels.
    .scrollTo(300, 0)
    //waits 2 seconds
    .wait(2000)
    // Take a screenshot and save it to the current directory.
    .screenshot("test/search-results.png")
    //waits 3 seconds
    .wait(3000)
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

