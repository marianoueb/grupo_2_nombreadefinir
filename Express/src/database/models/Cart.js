module.exports = (sequelize, DataTypes) => {
    let alias = "Cart";
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "carts",
        timestamps: false 
    };
    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function (models) {
        Cart.hasMany(models.Order, { 
            as: "Orders",
            foreignKey: 'cart_id'
        })

        Cart.belongsTo(models.User, { 
            as: "Users",
            foreignKey: 'user_id'
        })
    }

    return Cart;
}