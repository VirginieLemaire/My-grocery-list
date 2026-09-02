
/**
 * Refacto of controllers' methods
 * model's name is stored in request.model by middleware 'getModelName'
 * errors thrown here are caught by Express 5's built-in async handling
 * and formatted by the centralized error middleware in app/app.js
 */
module.exports = {
    // READ
    async findAll(request, response) {
        const datas = {
            modelTableName: request.modelTableName,
            model: request.model
        };
        const data = await request.model.findAll(datas);
        response.set('Content-Type', 'application/json');
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
        response.set('Content-Type', 'application/json');
        response.json(data);
    },
    // CREATE
    async save(request, response, next) {
        const datas = {
            modelTableName: request.modelTableName,
            model: request.model,
            body: request.body
        };
        // check if body is empty
        if (Object.keys(request.body).length === 0) {
            response.status(400).json({error: "Il n'y a pas de données à enregistrer"});
            return;
        }
        // check if request is about updating or creating
        if (request.params.id) {
            datas.id = request.params.id;
            // console.log("on est dans le cas d'une modification");
            const data = await new datas.model(datas).update();
            if (!data) {
                // go next middleware and stop function
                next();
                return;
            }
            response.json(data);
        } else {
            // console.log("on est dans le cas d'un ajout");
            const data = await new datas.model(datas).create();

            if (!data) {
                // go next middleware and stop function
                next();
                return;
            }
            response.set('Content-Type', 'application/json');
            response.status(201).json(data);
        }

    }
    

}