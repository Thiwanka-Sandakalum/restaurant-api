const { OrderItem } = require('../models/models');

function create_Order_items(ItemID, OrderID, Quantity,) {
    return OrderItem.create({
        ItemID,
        OrderID,
        Quantity,
    });
}

async function deleteOrder_items(id) {
    return OrderItem.destroy({
        where: { ItemID: id }
    });
}

module.exports = { create_Order_items, deleteOrder_items };
