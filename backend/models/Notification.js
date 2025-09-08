// models/Notification.js
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    type: {
      type: DataTypes.ENUM('low_stock', 'old_stock'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    componentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Components',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    severity: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
      defaultValue: 'medium'
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isEmailSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true
    }
  });

  Notification.associate = models => {
    Notification.belongsTo(models.Component, {
      foreignKey: 'componentId',
      as: 'Component'
    });
    Notification.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User'
    });
  };

  return Notification;
};