module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        user_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        user_name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        },
        avatar:{
            allowNull: true,
            type: Sequelize.STRING
        },
        is_admin:{
            allowNull: false,
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "users",
        timestamps: true
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