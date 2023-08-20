// REQUIRE
require('dotenv').config();
const express = require('express');
const router = require('./router');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpecifications, cssOptions } = require('../doc/API-documentation/swaggerDocs');

// USE
const app = express();

// body-parser for json
app.use(express.json());

// swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecifications, cssOptions));


// ROUTER
app.use('/api', router);

module.exports = app;