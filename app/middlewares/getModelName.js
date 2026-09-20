const models = require("./../models");

/**
 * Transforms name given in params into model name
 * @param {string} string name given in params
 * @returns
 */
const getModelNameFromParams = (string) => {
	//To manage some english plurals : transform the string if needed
	if (string.match(/ves$/)) {
		string = string.replace(/ves$/, "fs");
	}
	if (string.match(/ies$/)) {
		string = string.replace(/ies$/, "ys");
	}

	/*  In params, names are plural and lower case so we'll :
    1. put upper case 1st character
    2. add it the string, deleting:
        2.a) 1st character (or it would be there twice) 
        2.b) final "s" 
    So "items" -> "Item" */
	return string.charAt(0).toUpperCase() + string.slice(1, -1);
};

module.exports = {
	/**
	 * Put model name in request and goes to next middleware
	 * @param {*} request
	 * @param {*} response
	 * @param {*} next
	 * @returns error if no model corresponding
	 */
	addModelInRequest(request, response, next) {
		//Get model name from params
		const modelName = getModelNameFromParams(request.params.modelName);

		//get model with model name
		const model = models[modelName];

		//If no model for this string -> stop
		if (!model) {
			response.status(404).json({ error: "Endpoint non trouvé" });
			return;
		}
		//else put model in request.model
		request.model = model;
		request.modelName = modelName;
		request.modelTableName = modelName.toLowerCase();
		//and follow next middleware
		next();
	},
};
