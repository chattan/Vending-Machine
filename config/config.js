let config = {};
//database credentials
config.username =process.env.DB_USERNAME || "root"
config.password = process.env.DB_PASSWORD
config.database = process.env.DB_NAME
config.host = process.env.DB_HOST || "127.0.0.1"
config.dialect = process.env.DB_DRIVER || "mysql"
config.operatorsAliases = process.env.FREE_TRIES || false


module.exports = config;
