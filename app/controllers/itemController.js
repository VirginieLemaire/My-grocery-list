const Item = require('../models/item');

const itemController = {
    async findByFilter(request, response, next) {
        //create an object for the query string
        const queryString = {};
        //set properties if exists
        if (request.query.brand) queryString.brand = request.query.brand;
        if (request.query.category) queryString.category = request.query.category;
        if (request.query.shelf) queryString.shelf = request.query.shelf;
        if (request.query.name) queryString.name = request.query.name;
        // console.log({queryString});
        // console.log("zou on envoie au modèle")
        const data = await Item.findByFilter(queryString);

        if (!data) {
            // go to new middleware and stop function
            next();
            return;
        }
        response.json(data);
    },
};

module.exports = itemController;