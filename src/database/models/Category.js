module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        }
    }, {
        tableName: "categories",
        timestamps: true
    });

    Category.associate = function (models) {
        Category.hasMany(models.Product, { 
            as: "products", 
            foreignKey: "category_id"
        })
    }

    return Category;
}