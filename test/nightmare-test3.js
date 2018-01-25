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
    // Click login button. Always check if you've done this where necessary!
    // It's easy to forget.
    .click("#user_login_submit")
    //waits 3 seconds
    .wait(3000)
    // Click profiles page link.
    .click("a[href='/profile']")
    //waits 3 seconds
    .wait(3000)
    // Click modal link.
    .click(".modal-trigger")
    //waits 3 seconds
    .wait(3000)
    // Enter modal form info.
    .type("#recipient_title", "Cat")
    //waits 3 seconds
    .wait(3000)
    // Enter modal form info.
    .type("#recipient_firstname", "Asher")
    //waits 3 seconds
    .wait(3000)
    // Enter modal form info.
    .type("#recipient_lastname", "Meowsalot")
    //waits 3 seconds
    .wait(3000)
    // Enter modal form info.
    .click("#recipient_birthday")
    //waits 3 seconds
    .wait(3000)
    // Pick Today
    .click(".picker__today")
    // wait 2 seconds.
    .wait(2000)
    // Pick OK
    .click(".picker__close")
    // wait 2 seconds.
    .wait(2000)
    // Enter modal form info.
    .type("#recipient_email", "Meowsalotfakeemail@gmail.com")
    //waits 3 seconds
    .wait(3000)
    // Enter modal form info.
    .type("#recipient_budget", "150")
    //waits 3 seconds
    .wait(3000)
    // Enter modal form info.
    .type("#recipient_bio", "gifts for my cat.")
     // Take a screenshot and save it to the current directory.
     .screenshot("test/images/new-recipient.png")
    //waits 3 seconds
    .wait(3000)
    // Enter modal form info.
    .click("#recipient_registration_submit")
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