

module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        tableName: "categories",
        timestamps: false
    });

    Category.associate = function (models) {
        Category.hasMany(models.Product, { 
            as: "products", 
            foreignKey: "product_category_id"
        })
    }

    return Category;
}