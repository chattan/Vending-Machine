'use strict';
module.exports = (sequelize, DataTypes) => {
  const MachineCoins = sequelize.define('MachineCoins', {
    amount: DataTypes.INTEGER
  }, {});
  MachineCoins.associate = function(models) {
    // associations can be defined here
  };
  return MachineCoins;
};