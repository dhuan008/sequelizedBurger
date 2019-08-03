module.exports = function (sequelize, DataTypes) {
    // Define the Burger Sequelize model
    var Burger = sequelize.define("Burger",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            burger_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            devoured: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        });

    return Burger;
};
