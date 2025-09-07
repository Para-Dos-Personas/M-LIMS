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
        // A warehouse can have many components
        Warehouse.belongsToMany(models.User, {
            through: models.UserWarehouse,
            foreignKey: 'warehouseId',
            otherKey: 'userId',
            as: 'users'
        });
        Warehouse.hasMany(models.Item, {
            foreignKey: 'warehouseId',
            as: 'items'
        });
    };

    return Warehouse;
};