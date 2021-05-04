'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    transaction_id: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    amount_received: DataTypes.INTEGER,
    amount_payback: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Transactions.associate = function(models) {
    // associations can be defined here
  };
  return Transactions;
};