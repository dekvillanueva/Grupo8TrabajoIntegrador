
module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("Product", {
        product_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        description: {
            allowNull: true,
            type: Sequelize.TEXT
        },
        image: {
            allowNull: true,
            type: Sequelize.TEXT
        },
        price:{
            allowNull: false,
            type: Sequelize.DECIMAL
        },
        discount:{
            allowNull: true,
            type: Sequelize.INTEGER
        },
        category_id:{
            allowNull: false,
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "products",
        timestamps: true
    });

    Product.associate = function (models) {

        Product.belongsTo(models.Category, { 
            as: "categories",
            foreignKey: "category_id"
        })
       
        Product.belongsToMany(models.User, {
            as: "users",
            through: 'products_users',
            foreignKey: 'product_id',
            otherKey: 'user_id',
            timestamps: false
        })
    }

    return Product;
}