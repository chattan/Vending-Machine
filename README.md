# Vending Machine

This project is designed for vending machine which provides drinks after you insert the coin. 
It is designed using Express framework and sequelize ORM.


## Setup

Clone the repo and then run following commands

Install all required packages
```bash
npm install
```
Migrate database
note:- Setup your db and add credentials in .env file
```bash
sequelize db:migrate
```
Insert all Initial values in database 
```bash
sequelize db:seed:all
```
Run the project
```bash
npm start
```

