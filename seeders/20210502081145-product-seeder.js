'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Products', [
    {
        name: 'Coke',
        price: 20,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        name: 'Pepsi',
        price: 25,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        name: 'Deu',
        price: 30,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Products', null, {});
  }
};
