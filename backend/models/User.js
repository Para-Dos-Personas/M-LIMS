module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('Admin', 'User'),
      defaultValue: 'User',
    }
  });

  User.associate = (models) => {
    User.hasMany(models.ComponentLog, {
      foreignKey: 'userId',
      as: 'logs'
    });
  };

  return User;
};
