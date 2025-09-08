// backend/models/UserWarehouse.js
module.exports = (sequelize, DataTypes) => {
  // define an empty through table
  const UserWarehouse = sequelize.define(
    'UserWarehouse',
    {},
    {
      tableName: 'UserWarehouses',  // optional: your actual join‐table name
      timestamps: false             // or true if you want createdAt/updatedAt
    }
  );
  return UserWarehouse;
};