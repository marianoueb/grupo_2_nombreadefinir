module.exports = (sequelize, DataTypes) => {
    let alias = "Brand";
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        brand: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        logo: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    };
    let config = {
        tableName: "brands",
        timestamps: false
    };
    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models){
        Brand.hasMany(models.Product, {
            as: "Products",
            foreignKey: "brand_id"
        })
    }

    return Brand;
}