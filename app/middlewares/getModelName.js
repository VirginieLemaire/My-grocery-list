const models = require('./../models');

/**
 * Transforme le nom passé en paramètre en nom de modèle
 * @param {string} string nom passé en paramètre de la route
 * @returns 
 */
const getModelNameFromParams = (string) => {
   /*  comme dans les params les noms sont au pluriel et en minuscule, on va :
    1. passer le 1er caractère en majuscule
    2. lui ajouter la string en :
        2.a) enlevant ce 1er caractère (qui serait en double sinon) 
        2.b) supprimant le "s" final */
    return string.charAt(0).toUpperCase() + string.slice(1, -1);
}

module.exports = {
    /**
     * Stocke le nom du modèle dans request et de passe la main au prochain middleware
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     * @returns erreur si pas de modèle correspondant
     */
    addModelInRequest(request, response, next) {
        console.log("je rentre dans AddModelInRequest");
        
        //Récupérer le nom du modèle depuis le paramètre
        const modelName = getModelNameFromParams(request.params.modelName);
        console.log("voici mon modelName: ", modelName);
        //Récupérer le modèle grâce au nom
        const model = models[modelName];
        console.log("voici mon model: ", model);

        //Tester si erreur
        //si pas de modèle correspondant -> stop
        if (!model) {
            response.status(404).send('Not Found');
            return;
        }
        //dans le cas contraire, stocker le model dans la requête
        request.model = model;
        //et passer la main
        next();

    }
}