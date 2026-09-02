// REQUIRE
require('@dotenvx/dotenvx').config({logLevel: 'error', ignore: ['MISSING_ENV_FILE']});
const express = require('express');
const router = require('./router');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpecifications, cssOptions } = require('../doc/API-documentation/swaggerDocs');

// USE
const app = express();

// Mise en place des cors, origine autorisée définie par environnement.
// Le paquet cors traite `origin: undefined` (ou `false`) comme "autoriser
// toutes les origines" : on passe donc un tableau vide par défaut, qui lui
// bloque tout, plutôt que de risquer d'ouvrir le CORS en grand si
// CORS_ORIGIN n'est pas défini.
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN : []
};
app.use(cors(corsOptions));

// body-parser for json
app.use(express.json());

// swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecifications, cssOptions));


// ROUTER
app.use('/api', router);

// Gestionnaire d'erreurs centralisé.
// Express 5 attrape déjà tout seul les rejets de promesse des routes async
// et les transmet ici via next(error) : plus besoin de try/catch dans
// chaque contrôleur. On garde quand même ce middleware "par-dessus" la
// gestion native, parce que le handler par défaut d'Express renvoie du
// HTML (alors que cette API répond en JSON partout ailleurs) et peut
// fuiter la stack trace au client si NODE_ENV n'est pas explicitement
// "production" (ce que ce projet ne garantit pas).
app.use((error, request, response, _next) => {
  console.trace(error);
  response.status(500).json({ error: error.errors || error.message });
});

module.exports = app;