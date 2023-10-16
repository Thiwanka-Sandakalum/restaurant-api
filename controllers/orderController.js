// orderController.js
const { order, cancelOrder, reader, Orders } = require('../services/orderService');
const { create_Order_items } = require('../services/Order_itemsService');
const logger = require('../logger/index');

async function place_order(req, res) {
    try {
        const { order_data, order_items } = req.body;
        const { address, phone, pay_method, name } = order_data;

        const o_placed = await reader(phone);

        if (o_placed) {
            return res.status(404).json({ error: 'This order is already placed' });
        }

        const result = await order(address, phone, pay_method, name);
        logger.info('Order placed successfully continue .. Orader item placing');

        if (!result || !result.id) {
            return res.status(500).json({ error: 'Failed to create the order' });
        }

        if (!Array.isArray(order_items)) {
            return res.status(400).json({ error: 'Invalid order items format' });
        }

        try {
            await Promise.all(
                order_items.map(async (items) => {
                    const { menu_id, quantity } = items;
                    logger.log('menu_id:', menu_id);
                    logger.log('quantity:', quantity);
                    logger.log('result.id:', result.id);
                  
                    await create_Order_items(menu_id, result.id, quantity);
                    logger.info('Order item created successfully');
                  })                  
            );
            return res.status(200).json({ message: 'Order placed successfully' });
        } catch (error) {
            logger.error('Failed to create order items', error);
            return res.status(500).json({ error: 'Failed to create order items' });
        }
    } catch (error) {
        logger.error('An error occurred while placing the order', error);
        return res.status(500).json({ error: 'An error occurred while placing the order' });
    }
}



async function remove_order(req, res) {
    try {
        const { phone } = req.body;
        cancelOrder(phone);
        res.status(200).json('Successfully removed order');
        logger.info('Successfully removed order');
    } catch (error) {
        res.status(500).json({ error: 'Error while removing order' });
        logger.error('Error while removing order', error);
    }
}

async function find_order(req, res) {
    try {
        const ordersWithTotal = await Orders();
        res.status(200).json(ordersWithTotal);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
        logger.error('Error fetching orders', error);
    }
}

module.exports = { place_order, remove_order, find_order };
