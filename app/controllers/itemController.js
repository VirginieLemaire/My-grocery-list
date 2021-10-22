const Item = require('../models/item');

const itemController = {
    // findAll: async (_, response) => {
    //     try {
    //         const items = await Item.findAll();
    //         response.json(items);
    //     } catch(error) {
    //         console.log(error);
    //     }
    // },
    
    findOne: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            const item = await Item.findById(id);
            response.json(item);
        } catch(error) {
            console.log(error);
        }
    },

    findByCategory: async (request, response) => {
        try {
            const catId = parseInt(request.params.id, 10);
            const items = await Item.findByCategory(catId);
            response.json(items);
        } catch (error) {
            console.log(error);
        }
    },

    findByBrand: async (request, response) => {
        try {
            const brandId = parseInt(request.params.id, 10);
            const items = await Item.findByBrand(brandId);
            response.json(items);
        } catch (error) {
            console.log(error);
        }
    },

    findByShelf: async (request, response) => {
        try {
            const shelfId = parseInt(request.params.id, 10);
            const items = await Item.findByShelf(shelfId);
            response.json(items);
        } catch (error) {
            console.log(error);
        }
    }
    //TODO Ajouter un article dans la base de données
    //TODO modifier un article dans la base de données (update, delete)
    //TODO factoriser les findBy

};

module.exports = itemController;