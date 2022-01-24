//REQUIRE
require('dotenv').config();
const express = require('express');
const router = require('./app/router');

//USE
const app = express();


//body-parser pour les routes post qui rendent du json
app.use(express.json());

//PORT
const PORT = process.env.PORT;

//une fois tout defini on utilise le router
//app.use(router); ou plutôt pour gèrer les versions:
app.use('/v1', router);

//LANCEMENT DU SERVEUR
app.listen(PORT, () => {
    console.log(`App on http://localhost:${PORT}/v1`);
});
