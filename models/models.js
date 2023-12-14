const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db_config');

// Define Menu model
const Menu = sequelize.define('Menu', {
    Name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    Price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    Description: {
        type: Sequelize.TEXT,
    },
});

// Define Order model
const Order = sequelize.define('Order', {
    Address: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    CustomerName: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    Phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    PaymentMethod: {
        type: Sequelize.STRING(50),
    },
});

// Define OrderItem model
const OrderItem = sequelize.define('OrderItem', {
    Quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

// impliment relations
Menu.hasMany(OrderItem, { foreignKey: 'ItemID', onDelete: 'CASCADE' });
OrderItem.belongsTo(Menu, { foreignKey: 'ItemID', onDelete: 'CASCADE' });
Order.hasMany(OrderItem, { foreignKey: 'OrderID' });
OrderItem.belongsTo(Order, { foreignKey: 'OrderID' });

module.exports = {
    Menu,
    Order,
    OrderItem,
};
