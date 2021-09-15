module.exports = (sequelize, DataTypes) => {
    let alias = "Category";
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING(25),
            allowNull: false
        }
    };
    let config = {
        tableName: "categories",
        timestamps: false
    };
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany(models.Product, { 
            as: "Products",
            foreignKey: 'category_id'
        })
    }

    return Category;
}