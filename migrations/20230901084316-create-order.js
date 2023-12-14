'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('menus', {
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
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }),
      queryInterface.createTable('Orders', {
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
          type: Sequelize.STRING,
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
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }),
      queryInterface.createTable('Order_items', {
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
            model: 'menu',
            onDelete: 'CASCADE'
          }
        },
        order_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            key: 'id',
            model: 'Order',
            onDelete: 'CASCADE'
          }
        },
        quantity: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Order_items'),
      queryInterface.dropTable('Orders'),
      queryInterface.dropTable('menus'),
    ]);
  }
};
