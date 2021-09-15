module.exports = (sequelize, DataTypes) => {
    let alias = "User";
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
        surname: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        tel: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.UserType, {
            as: "UserType",
            foreignKey: "type_id"
        })
    }

    return User;
}