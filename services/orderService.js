// orderService.js
const { Order, OrderItem, Menu } = require('../models/models');

async function order(Address, Phone, PaymentMethod, CustomerName) {
  try {
    return await Order.create({
      Address,
      Phone,
      PaymentMethod,
      CustomerName,
    });
  } catch (error) {
    console.error('Error creating order:', error.message);
    throw error;
  }
}

async function reader(Phone) {
  try {
    return await Order.findOne({ where: { Phone } });
  } catch (error) {
    console.error('Error finding order:', error.message);
    throw error;
  }
}

async function cancelOrder(Phone) {
  try {
    await Order.destroy({ where: { Phone } });
    console.log(`Order with Phone ${Phone} and associated Order_items deleted.`);
  } catch (error) {
    console.error('Error canceling order:', error.message);
  }
}

async function deleteOrder(id) {
  try {
    await Order.destroy({ where: { id } });
    console.log(`Order with ID ${id} and associated Order_items deleted.`);
  } catch (error) {
    console.error('Error deleting order:', error.message);
  }
}

async function Orders() {
  try {
    return await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Menu,
              attributes: ['Price', 'Name'],
            },
          ],
          attributes: ['Quantity'],
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    throw error;
  }
}

module.exports = { order, cancelOrder, reader, Orders, deleteOrder };
