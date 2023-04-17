// REQUIRE
require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecifications = require('./doc/API-documentation/swaggerDocs');

// USE
const app = express();


// body-parser for json
app.use(express.json());

// swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecifications));

// PORT
const PORT = process.env.PORT;

// ROUTER
app.use('/v1', router);

// SERVER
app.listen(PORT, () => {
    console.log(`App on http://localhost:${PORT}/v1`);
});
