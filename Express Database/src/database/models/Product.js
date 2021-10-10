module.exports = (sequelize, DataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    };
    let config = {
        tableName: "products",
        timestamps: false 
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Brand, {
            as: "Brand",
            foreignKey: "brand_id"
        })

        Product.belongsTo(models.Category, { 
            as: "Categories",
            foreignKey: 'category_id'
        })

        Product.hasMany(models.Order, { 
            as: "Orders",
            foreignKey: 'product_id'
        })
    }

    return Product;
}
