
/**
 * Refacto of controllers' methods
 * model's name is stored in request.model by middleware 'getModelName'
 * try, catch are handled by utils/catching wich is used in the router
 */
module.exports = {
    // READ
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
        
        if (!data) {
            // go next middleware and stop function
            next();
            return;
        }
        response.json(data);
    },
    // CREATE
    async save(request, response, next) {
        const datas = {
            modelTableName: request.modelTableName,
            model: request.model,
            body: request.body
        };
        // vérifier que le body n'est pas vide
        if (Object.keys(request.body).length === 0) {
            response.status(400).json("Il n'y a pas de données à enregistrer");
            return;
        }
        // Savoir s'il s'agit d'un ajout ou d'une modification
        if (request.params.id) {
            console.log("on est dans le cas d'une modification");
        } else {
            console.log("on est dans le cas d'un ajout");
            const data = await new datas.model(datas).create();

            if (!data) {
                // go next middleware and stop function
                next();
                return;
            }

            response.json(data);
        }

    }
    

}