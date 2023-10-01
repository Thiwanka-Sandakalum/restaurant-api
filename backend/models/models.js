// Import Sequelize and configure it
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite', // You can change this to your desired database dialect (e.g., 'mysql', 'postgres')
    storage: './database/dev.sqlite', // Adjust the storage path as needed
    logging: true, // Set to true to see SQL queries in the console
});

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

// Define associations
// Define associations with cascading deletes
Menu.hasMany(OrderItem, { foreignKey: 'ItemID', onDelete: 'CASCADE' });
OrderItem.belongsTo(Menu, { foreignKey: 'ItemID', onDelete: 'CASCADE' });
Order.hasMany(OrderItem, { foreignKey: 'OrderID' });
OrderItem.belongsTo(Order, { foreignKey: 'OrderID' });

// Synchronize the models with the database
sequelize.sync()
    .then(() => {
        console.log('Database and tables created!');
    })
    .catch((err) => {
        console.error('Error synchronizing database:', err);
    });

module.exports = {
    Menu,
    Order,
    OrderItem,
};
