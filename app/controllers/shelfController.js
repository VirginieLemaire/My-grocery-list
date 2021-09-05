const Shelf = require('../models/shelf');

const brandController = {
    findAll: async (_, response) => {
        try {
            const shelves = await Shelf.findAll();
            response.json(shelves);
        } catch(error) {
            console.log(error);
        }
    },
    
    findOne: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            const shelf = await Shelf.findById(id);
            response.json(shelf);
        } catch(error) {
            console.log(error);
        }
    }

};

module.exports = brandController;