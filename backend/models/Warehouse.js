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
    // A warehouse can have many users through the join table UserWarehouse
    Warehouse.belongsToMany(models.User, {
      through: models.UserWarehouse,
      foreignKey: 'warehouseId',
      otherKey: 'userId',
      as: 'Users'  // Important: capital 'U' to match controller expectation
    });

    // A warehouse can have many components
    Warehouse.hasMany(models.Component, {
      foreignKey: 'warehouseId',
      as: 'components'
    });
  };

  return Warehouse;
};