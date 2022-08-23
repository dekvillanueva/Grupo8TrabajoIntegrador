
module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("Product", {
        product_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        product_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        product_description: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        product_image: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        product_price:{
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        product_discount:{
            allowNull: true,
            type: DataTypes.INTEGER
        },
        product_category_id:{
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }, {
        tableName: "products",
        timestamps: false
    });

    Product.associate = function (models) {

        Product.belongsTo(models.Category, { 
            as: "categories",
            foreignKey: "product_category_id"
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