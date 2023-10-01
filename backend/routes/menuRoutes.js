const express = require('express');
const router = express.Router();
const { read_menu, create_menu, delete_menu, update_menu } = require('../controllers/menuController');
const { body } = require('express-validator');

const menu_validator = [
    body("name").trim().notEmpty().withMessage('Name is required'),
    body("price").trim().notEmpty().withMessage('Price is required')
]

// get the menu
router.get('/', read_menu);

// add menu
router.post('/', menu_validator, create_menu);

// update menu
router.put('/', update_menu);

// delete menu
router.delete('/', delete_menu)


module.exports = router;
