
module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("Product", {
        product_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        image: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        price:{
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        discount:{
            allowNull: true,
            type: DataTypes.INTEGER
        },
        category_id:{
            allowNull: false,
            type: DataTypes.INTEGER
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