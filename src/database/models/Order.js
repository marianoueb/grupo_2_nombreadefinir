module.exports = (sequelize, DataTypes) => {
    let alias = "Order";
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cart_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "orders",
        timestamps: false 
    };
    const Order = sequelize.define(alias, cols, config);

    Order.associate = function (models) {
        Order.belongsTo(models.Product, { 
            as: "Products",
            foreignKey: 'product_id'
        })

        Order.belongsTo(models.Cart, { 
            as: "Carts",
            foreignKey: 'cart_id'
        })
    }

    return Order;
}