const { Order, OrderItem, Menu, sequelize } = require('../models/models');

async function order(Address, Phone, PaymentMethod, CustomerName) {
  try {
    return await Order.create({
      Address,
      Phone,
      PaymentMethod,
      CustomerName,
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function reader(Phone) {
  try {
    result = await Order.findOne({ where: { Phone } });
    return result
  } catch (error) {
    throw error
  }
}

async function cancelOrder(Phone) {
  try {
    await Order.destroy({ where: { Phone } });
    console.log(`Order with Phone ${Phone} and associated Order_items deleted.`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function deleteOrder(id) {
  try {
    await Order.destroy({ where: { id } });
    console.log(`Order with Phone ${id} and associated Order_items deleted.`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const calculateOrderTotal = async (order) => {
  const orderItems = await order.getOrder_items();
  let total = 0;

  // Calculate the total for this order by summing the prices of order items
  for (const orderItem of orderItems) {
    const menu = await orderItem.getMenu(); // Get the associated menu item
    total += orderItem.quantity * menu.price;
  }
  return total;
};

async function Orders() {
  // Define the query
 return Order.findAll({
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: Menu,
            attributes: ['Price','Name'],
          },
        ],
        attributes: ['Quantity'],
      },
    ],
  })
    // .then((orders) => {
    //   // Process the orders and calculate the total for each
    //   orders.forEach((order) => {
    //     const orderItems = order.OrderItems;
    //     let totalCost = 0;

    //     orderItems.forEach((orderItem) => {
    //       totalCost += orderItem.Quantity * orderItem.Menu.Price;
    //     });

    //     console.log(`Order ID: ${order.id}`);
    //     console.log(`Customer CustomerName: ${order.CustomerCustomerName}`);
    //     console.log(`Total Cost: $${totalCost.toFixed(2)}`);
    //     console.log('Order Items:');
    //     orderItems.forEach((orderItem) => {
    //       console.log(`  - ${orderItem.Quantity} x ${orderItem.Menu.CustomerName}`);
    //     });
    //     console.log('-------------------------');
    //   });
    // })
    // .catch((error) => {
    //   console.error('Error fetching orders:', error);
    // })



  // try {
  //   // const orders = await Order.findAll({
  //   //   include: [
  //   //     {
  //   //       model: Order_item,
  //   //       include: [
  //   //         {
  //   //           model: Menu,
  //   //         },
  //   //       ],
  //   //     },
  //   //   ],
  //   // })
  //   // console.log(orders);

  //   // Process the orders and calculate totals
  //   // const ordersWithTotal = await Promise.all(
  //   //   orders.map(async (order) => {
  //   //     const total = await calculateOrderTotal(order);
  //   //     return {
  //   //       Address: order.Address,
  //   //       createdAt: order.createdAt,
  //   //       CustomerName: order.CustomerName,
  //   //       PaymentMethod: order.PaymentMethod,
  //   //       Phone: order.Phone,
  //   //       total: total.toFixed(2), // Format total as a string with 2 decimal places
  //   //       orderItems: order.Order_items.map((orderItem) => ({
  //   //         CustomerName: orderItem.Menu.CustomerName,
  //   //         price: orderItem.Menu.price.toFixed(2), // Format price as a string with 2 decimal places
  //   //         quantity: orderItem.quantity,
  //   //       })),
  //   //     };
  //   //   })
  //   // );

  //   // return ordersWithTotal;
  // } catch (error) {
  //   throw error;
  // }
}


module.exports = { order, cancelOrder, reader, Orders, deleteOrder };


