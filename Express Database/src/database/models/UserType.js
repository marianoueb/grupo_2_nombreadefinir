const User = require("./User");

module.exports = (sequelize, DataTypes) => {
    let alias = "UserType";
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING(5),
            allowNull: false
        }
    };
    let config = {
        tableName: "user_types",
        timestamps: false
    };
    const UserType = sequelize.define(alias, cols, config);

    UserType.associate = function(models){
        UserType.hasMany(models.User, {
            as: "Users",
            foreignKey: "type_id"
        })
    }

    return UserType;
}