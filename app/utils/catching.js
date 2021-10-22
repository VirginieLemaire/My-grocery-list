/**
 * Intercepte les erreurs de la fonction passée en paramètre et les retourne à l'API
 * @param {*} funct fonction appelée par express sur la route empruntée
 * @returns l'éxécution de la fonction ou erreur selon le cas
 */
module.exports.catching = (funct) => {
    //retourner une fonction appelée par express en accédant à la route
    return async (request, response, next) => {
        try {
            //Appel de la fonction passée en paramètre
            return await funct(request, response, next);
        } catch (error) {
            //Afficher l'erreur en console
            console.trace(error);
            //Informer le front
            response.status(500).send(error.errors || "ça ne fonctionne pas...");
        }
    }
}