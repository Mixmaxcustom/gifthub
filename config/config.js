module.exports = {
	development: {
		username: 'root',
		password: 'password',
		database: 'gifthub_db',
		host: 'localhost',
		dialect: 'mysql'
	},
	test: {
		username: process.env.CI_DB_USERNAME,
		password: process.env.CI_DB_PASSWORD,
		database: process.env.CI_DB_NAME,
		host: 'localhost',
		dialect: 'mysql'
	},
	production: {
		username: process.env.PROD_DB_USERNAME,
		password: process.env.PROD_DB_PASSWORD,
		database: process.env.PROD_DB_NAME,
		host: process.env.PROD_DB_HOSTNAME,
		dialect: 'mysql'
	}
};