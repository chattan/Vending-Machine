'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};