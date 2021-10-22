
/**
 * Refacto des méthodes des controllers
 * le nom de model est stocké dans request.model grâce au middleware geteModelName
 * les try, catch, quant à eux sont dans l'utilitaire catching qui englobe les appels de fonction (currying) dans le router
 */
module.exports = {
    
    async findAll(request, response) {
        const datas = {
            modelTableName: request.modelTableName,
            model: request.model
        };
        const data = await request.model.findAll(datas);
        response.json(data);
    },

    async findOne(request, response, next) {
        const datas = {
            modelTableName: request.modelTableName,
            model: request.model
        };
        const data = await request.model.findById(datas, request.params.id);
        //prévoir le cas où la donnée n'existe pas
        if (!data) {
            //passer au middleware suivant, arrêter la fonction
            next();
            return;
        }
        response.json(data);
    }
}