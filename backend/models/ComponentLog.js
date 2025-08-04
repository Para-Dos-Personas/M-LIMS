// models/ComponentLog.js
module.exports = (sequelize, DataTypes) => {
  const ComponentLog = sequelize.define("ComponentLog", {
    changeType: DataTypes.ENUM('inward', 'outward'),
    quantity: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    project: DataTypes.STRING
  });

  ComponentLog.associate = models => {
    ComponentLog.belongsTo(models.Component, {
      foreignKey: 'componentId',
      as: 'component'
    });
    ComponentLog.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return ComponentLog;
};
