const { order, cancelOrder, reader, Orders } = require('../services/orderService');
const { create_Order_items } = require('../services/Order_itemsService');

// place the order
async function place_order(req, res) {
    try {
        const { order_data, order_items } = req.body;
        const { address, phone, pay_method, name } = order_data;
        console.log(order_items)

        // find this order already placed
        const o_placed = await reader(phone);

        if (o_placed === null || o_placed === undefined) {
            // Create the order
            let result = await order(address, phone, pay_method, name);
            if (result && result.id) {
                if (Array.isArray(order_items)) {
                    try {
                        await Promise.all(
                            order_items.map(async (items) => {
                                const { menu_id, quantity } = items;

                                console.log(result.id, items);
                                // Create order items
                                await create_Order_items(menu_id, result.id, quantity);
                            }));
                        res.status(200).json({ message: 'Order placed successfully' });
                    } catch (error) {
                        res.status(500).json({ error: 'Failed to create order items' });
                    }
                } else {
                    res.status(400).json({ error: 'Invalid order items format' });
                }
            } else {
                res.status(500).json({ error: 'Failed to create the order' });
            }
        } else {
            res.status(404).json({ message: 'This order is already placed' });
        }

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while placing the order' });
    }
}

// remove order
async function remove_order(req, res) {
    try {
        const { phone } = req.body;
        cancelOrder(phone);
        res.status(200).json("successfull remove order");
    }
    catch (error) {
        res.status(500).json(err);
    }
}

// Your find_order function
async function find_order(req, res) {
    try {
      const ordersWithTotal = await Orders();
      res.status(200).json(ordersWithTotal);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders' });
      console.error(error);
    }
  }  

module.exports = { place_order, remove_order, find_order };