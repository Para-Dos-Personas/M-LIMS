// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.ENUM('Admin', 'User'),
      defaultValue: 'User',
      allowNull: false
    }
  });

  User.associate = (models) => {
    User.hasMany(models.ComponentLog, {
      foreignKey: 'userId',
      as: 'logs',
      onDelete: 'CASCADE'
    });
  };

  return User;
};
