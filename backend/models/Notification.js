// models/Notification.js
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    type: {
      type: DataTypes.ENUM('low_stock', 'old_stock'),
      allowNull: false,
      comment: 'Type of notification: low_stock or old_stock'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Notification title'
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Detailed notification message'
    },
    componentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Components',
        key: 'id'
      },
      comment: 'Related component ID if applicable'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      comment: 'Target user ID, null for all users'
    },
    severity: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
      defaultValue: 'medium',
      comment: 'Notification severity level'
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether the notification has been read'
    },
    isEmailSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether email notification has been sent'
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Additional metadata like component details, quantities, etc.'
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
