const Item = require('../models/item');

const itemController = {
    async findByFilter(request, response, next) {
        //create an object for the query string
        const queryString = {};
        //set properties if exists
        if (request.query.brand) queryString.brand = request.query.brand;
        if (request.query.category) queryString.category = request.query.category;
        if (request.query.shelf) queryString.shelf = request.query.shelf;
        console.log({queryString});
        console.log("zou on envoie au modèle")
        const data = await Item.findByFilter(queryString);
        //prévoir le cas où la donnée n'existe pas
        if (!data) {
            //passer au middleware suivant, arrêter la fonction
            next();
            return;
        }
        response.json(data);
    },

    //TODO Ajouter un article dans la base de données
    //TODO modifier un article dans la base de données (update, delete)
    //TODO factoriser les findBy

};

module.exports = itemController;