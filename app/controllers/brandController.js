const Brand = require('../models/brand');

const brandController = {
    findAll: async (_, response) => {
        try {
            const brands = await Brand.findAll();
            response.json(brands);
        } catch(error) {
            console.log(error);
        }
    },
    
    findOne: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            const brand = await Brand.findById(id);
            response.json(brand);
        } catch(error) {
            console.log(error);
        }
    }

};

module.exports = brandController;