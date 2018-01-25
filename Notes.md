### Migrating & Seeding the Database

```
sequelize db:drop                  # drop the current database
sequelize db:create                # recreate database
sequelize db:migrate               # rebuild the tables
sequelize db:seed:all              # seed all tables
```

### Updating Heroku
```
heroku run bash -a gift-hub        # run heroku command

``


### Sequelize Info

- [Setting up with Sequelize CLI][node-sequelize-url]
- [Sequelize CLI Commands][sequelize-cli-url]


### JSON Web Tokens

- [Basic Authentication][auth-url]
- [Tutorial][jwt-intro-url]


### Express Info

- [Routing with Middleware][express-middleware]


### Handlebars Templates
```
views/layouts                                   - page layouts
views/login.hbs                                 - login page
views/profile.hbs                               - user home page
views/register.hbs                              - user registration page
views/search.hbs                                - user search page

views/partials/actions                          - action buttons
views/partials/modals                           - modal uis
views/partials/gifts/gift-detail.hbs            - gift search result card
views/partials/search-bar.hbs                   - search bar for gifts
views/partials/recipients/recipient-detail.hbs  - recipient detail card
```


[node-sequelize-url]:http://mherman.org/blog/2015/10/22/node-postgres-sequelize
[sequelize-cli-url]:https://github.com/sequelize/cli
[express-middleware]:http://expressjs.com/en/guide/using-middleware.html
[jwt-intro-url]:https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
[auth-url]:https://medium.com/@devontem/simple-authentication-in-node-express-using-jwt-json-web-tokens-3fe5a9e85b1c
