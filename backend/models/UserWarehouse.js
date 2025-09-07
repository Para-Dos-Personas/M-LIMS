// backend/models/UserWarehouse.js
module.exports = (sequelize, DataTypes) => {
  const UserWarehouse = sequelize.define('UserWarehouse', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  }, {
    tableName: 'user_warehouses',
    timestamps: false
  });
  return UserWarehouse;
};