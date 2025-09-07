// backend/models/Warehouse.js
module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define("Warehouse", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Warehouse.associate = models => {
    // A warehouse can have many components
    Warehouse.hasMany(models.Component, {
      foreignKey: 'warehouseId',
      as: 'components'
    });
    // A warehouse can be assigned to many users
    Warehouse.belongsToMany(models.User, {
      through: 'UserWarehouses',
      foreignKey: 'warehouseId',
      as: 'users'
    });
  };

  return Warehouse;
};