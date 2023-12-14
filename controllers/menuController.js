const { getMenus, createMenu, updateMenu, deleteMenu } = require('../services/menuService');
const { validationResult } = require('express-validator');
const logger = require('../logger/index');


// handling unique constraint violations
function handleUniqueConstraintViolation(res, error) {
    logger.error('Unique constraint violation:', error.message);
    res.status(500).json({ error: error.message });
}

// get menus
async function read_menu(req, res) {
    try {
        const result = await getMenus()
        if (result.length > 0) {
            res.status(200).json(result);
            logger.info('reading succseful')
        } else {
            res.status(404).json({ error: 'No menus found' });
            logger.warn('No menus found')
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// create menu
async function create_menu(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error('validation in request', errors)
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, description, price } = req.body;
        await createMenu(name, description, price);
        res.status(200).json({ message: "Success creating menu" });
        logger.info('Success creating menu');

    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            const uniqueViolationError = error.errors.find(err => err.type === 'unique violation');
            if (uniqueViolationError) {
                handleUniqueConstraintViolation(res, uniqueViolationError);
            } else {
                logger.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        } else {
            logger.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

// update menu
async function update_menu(req, res) {
    try {
        const { id, price } = req.body;
        await updateMenu(id, price);
        res.status(200).json({ message: "Success updating menu" });
        logger.info("Success updating menu")
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// delete menu
async function delete_menu(req, res) {
    logger.log(req.body)
    try {
        const { id } = req.body;
        await deleteMenu(id);
        res.status(204).send({ massage: "successfull deleted" });
        logger.info(`${id} menu id successfull deleted`)
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { read_menu, create_menu, delete_menu, update_menu };
