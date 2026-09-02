const Item = require('../models/item');

const itemController = {
    async findByFilter(request, response) {
        //create an object for the query string
        const queryString = {};
        //set properties if exists
        if (request.query.brand) queryString.brand = request.query.brand;
        if (request.query.category) queryString.category = request.query.category;
        if (request.query.shelf) queryString.shelf = request.query.shelf;
        if (request.query.name) queryString.name = request.query.name;

        // Item.findByFilter always resolves to an array (possibly empty) :
        // no filter match is a valid 200 with [], not a 404.
        const data = await Item.findByFilter(queryString);
        response.json(data);
    },
};

module.exports = itemController;