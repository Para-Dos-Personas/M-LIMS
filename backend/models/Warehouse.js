// backend/models/Warehouse.js

module.exports = (sequelize, DataTypes) => {
    const Warehouse = sequelize.define("Warehouse", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Warehouse.associate = models => {
        // A warehouse can have many users through the join table
        Warehouse.belongsToMany(models.User, {
            through: models.UserWarehouse,
            foreignKey: 'warehouseId',
            otherKey: 'userId',
            as: 'users'
        });

        // A warehouse can have many components (changed from 'Item' to 'Component')
        Warehouse.hasMany(models.Component, {
            foreignKey: 'warehouseId',
            as: 'components'  // Changed from 'items' to 'components' for clarity
        });
    };

    return Warehouse;
};