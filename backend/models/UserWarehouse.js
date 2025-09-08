// backend/models/UserWarehouse.js
module.exports = (sequelize, DataTypes) => {
  const UserWarehouse = sequelize.define('UserWarehouse', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Warehouses',
        key: 'id'
      }
    }
  }, {
    tableName: 'UserWarehouses',
    timestamps: false, // Match your original setting
    // Composite primary key to prevent duplicate assignments
    indexes: [
      {
        unique: true,
        fields: ['userId', 'warehouseId']
      }
    ]
  });

  // No associations needed here since it's just a join table
  // The associations are defined in User.js and Warehouse.js
  
  return UserWarehouse;
};