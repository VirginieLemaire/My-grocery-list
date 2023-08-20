const models = require('./../models');

/**
 * Transforms name given in params into model name
 * @param {string} string name given in params
 * @returns 
 */
const getModelNameFromParams = (string) => {
    //To manage some english plurals : transform the string if needed
    if (string.match(/ves$/)) {
        string = string.replace(/ves$/,'fs');
        // console.log("ma new string: ",string);
    }
    if (string.match(/ies$/)) {
        string = string.replace(/ies$/,'ys');
        // console.log("ma new string: ",string);
    }

   /*  In params, names are plural and lower case so we'll :
    1. put upper case 1st character
    2. add it the string, deleting:
        2.a) 1st character (or it would be there twice) 
        2.b) final "s" 
    So "items" -> "Item" */
    return string.charAt(0).toUpperCase() + string.slice(1, -1);
}

module.exports = {
    /**
     * Put model name in request and goes to next middleware
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     * @returns error if no model corresponding
     */
    addModelInRequest(request, response, next) {
        // console.log("je rentre dans AddModelInRequest");
        
        //Get model name from params
        const modelName = getModelNameFromParams(request.params.modelName);
        //console.log("voici mon modelName: ", modelName);

        //get model with model name
        const model = models[modelName];
        // console.log("voici mon model: ", model);
        
        //If no model for this string -> stop
        if (!model) {
            response.status(404).send('Not Found');
            return;
        }
        //else put model in request.model
        request.model = model;
        request.modelName = modelName;
        request.modelTableName = modelName.toLowerCase();
        //console.log("j'envoie : ", request.model, request.modelTableName )
        //and follow next middleware
        next();

    }
}