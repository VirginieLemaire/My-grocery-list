/**
 * Catches errors from function given in parameter et returns to API
 * @param {*} funct function called by express on the given route
 * @returns execute function or return error
 */
module.exports.catching = (funct) => {
    //returns a function called by express on the taken route
    return async (request, response, next) => {
        try {
            //Call the function given in parameter
            return await funct(request, response, next);
        } catch (error) {
            //Give error in console
            console.trace(error);
            //Send it to front-end
            response.status(500).send(error.errors || error.message);
        }
    }
}