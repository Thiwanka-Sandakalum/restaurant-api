// Order-related routes
const express = require('express');
const router = express.Router()
const { place_order, remove_order, find_order } = require('../controllers/orderController');


router.get('/', find_order)
// Route for creating an order
router.post('/', place_order);

// Route for deleting an order
router.delete('/', remove_order);

module.exports = router;
