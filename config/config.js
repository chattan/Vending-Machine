let config = {
  development: {
    username: 'postgres',
  	password: 'root',
 	database: 'vendingmachine_test',
  	host: 'localhost',
  	port: '5432',
  	dialect: 'postgres'
   
  },
  test: {
    username: 'postgres',
  	password: 'root',
 	database: 'vendingmachine_test',
  	host: 'localhost',
  	port: '5432',
  	dialect: 'postgres'
   
  },
  production: {
   username: 'postgres',
  	password: 'root',
 	database: 'vendingmachine_test',
  	host: 'localhost',
  	port: '5432',
  	dialect: 'postgres'
   
  }
};

module.exports = config;