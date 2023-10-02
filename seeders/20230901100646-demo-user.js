'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for Menus
    const menusData = [
      {
        name: 'Menu Item 1',
        description: 'Description for Menu Item 1',
        price: 10.99,
      },
      {
        name: 'Menu Item 2',
        description: 'Description for Menu Item 2',
        price: 12.99,
      },
      // Add more menu items as needed
    ];

    // Seed data for Orders
    const ordersData = [
      {
        address: '123 Main St',
        phone: '1234567890',
        pay_method: 'cash',
        name: 'John Doe',
      },
      {
        address: '456 Elm St',
        phone: '9876543210',
        pay_method: 'online',
        name: 'Jane Smith',
      },
      // Add more orders as needed
    ];

    // Seed data for Order_items
    const orderItemsData = [
      {
        menu_id: 1,
        order_id: 1,
        quantity: 2,
      },
      {
        menu_id: 2,
        order_id: 1,
        quantity: 1,
      },
      // Add more order items as needed
    ];

    // Insert seed data into respective tables
    await queryInterface.bulkInsert('Menus', menusData);
    await queryInterface.bulkInsert('Orders', ordersData);
    await queryInterface.bulkInsert('Order_items', orderItemsData);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all data from the tables
    // Before undoing seed data
    await queryInterface.bulkDelete('Menus', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Order_items', null, {});
  }
};
