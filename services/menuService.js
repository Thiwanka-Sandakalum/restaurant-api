const { Menu } = require('../models/models');

function getMenus() {
    return Menu.findAll();
}

function createMenu(Name, Description, Price) {
    return Menu.create({
        Name, Description, Price
    });
}

function updateMenu(id, Price) {
    return Menu.update(
        { Price },
        {
            where: { id },
        }
    );
}

async function deleteMenu(id) {
    // Delete the Menu record
    return Menu.destroy({
        where: { id }
    });
}


module.exports = {
    getMenus,
    createMenu,
    updateMenu,
    deleteMenu,
};
