module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        user_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        avatar:{
            allowNull: true,
            type: DataTypes.STRING
        },
        is_admin:{
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }, {
        tableName: "users",
        timestamps: false
    });

    User.associate = function (models) {
       
        User.belongsToMany(models.Product, {
            as: "products",
            through: 'products_users',
            foreignKey: 'user_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }

    return User;
}