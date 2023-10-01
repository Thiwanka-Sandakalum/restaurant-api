'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('menus', { // Use singular table name
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          unique: true
        },
        description: {
          type: Sequelize.STRING
        },
        price: {
          type: Sequelize.DECIMAL
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          // Remove defaultValue if you handle timestamps in your application
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          // Remove defaultValue if you handle timestamps in your application
        }
      }),
      queryInterface.createTable('Orders', { // Use singular table name
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING, // Change to STRING since it's a phone number
          allowNull: false,
          unique: true
        },
        pay_method: {
          type: Sequelize.ENUM('cash', 'online'),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          // Remove defaultValue if you handle timestamps in your application
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          // Remove defaultValue if you handle timestamps in your application
        }
      }),
      queryInterface.createTable('Order_items', { // Use singular table name
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER
        },
        menu_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            key: 'id',
            model: 'menu', // Use singular table name
            onDelete: 'CASCADE' // Automatically delete related order items when a menu is deleted
          }
        },
        order_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            key: 'id',
            model: 'Order', // Use singular table name
            onDelete: 'CASCADE' // Automatically delete related order items when an order is deleted
          }
        },
        quantity: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          // Remove defaultValue if you handle timestamps in your application
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          // Remove defaultValue if you handle timestamps in your application
        }
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Order_items'), // Use singular table name
      queryInterface.dropTable('Orders'), // Use singular table name
      queryInterface.dropTable('menus'), // Use singular table name
    ]);
  }
};
