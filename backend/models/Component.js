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
    }
  });

  Component.associate = models => {
    Component.hasMany(models.ComponentLog, {
      foreignKey: 'componentId',
      as: 'logs'
    });
  };

  return Component;
};
