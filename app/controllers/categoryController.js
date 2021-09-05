const Category = require('../models/category');

const brandController = {
    findAll: async (_, response) => {
        try {
            const categories = await Category.findAll();
            response.json(categories);
        } catch(error) {
            console.log(error);
        }
    },
    
    findOne: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            const category = await Category.findById(id);
            response.json(category);
        } catch(error) {
            console.log(error);
        }
    }

};

module.exports = brandController;