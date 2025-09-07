// models/Component.js
module.exports = (sequelize, DataTypes) => {
  const Component = sequelize.define("Component", {
    name: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    partNumber: DataTypes.STRING,
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    location: DataTypes.STRING,
    unitPrice: DataTypes.FLOAT,
    datasheetLink: DataTypes.STRING,
    category: DataTypes.STRING,
    criticalThreshold: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      allowNull: false
    },
    manufactureDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    expiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    // --- ADD THIS FIELD ---
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Warehouses', // This should match the table name for warehouses
        key: 'id',
      },
    },
    // --------------------
  });

  Component.associate = models => {
    Component.hasMany(models.ComponentLog, {
      foreignKey: 'componentId',
      as: 'logs'
    });

    // --- ADD THIS ASSOCIATION ---
    // Each component belongs to one warehouse.
    Component.belongsTo(models.Warehouse, {
      foreignKey: 'warehouseId',
      as: 'warehouse',
    });
    // --------------------------
  };

  return Component;
};