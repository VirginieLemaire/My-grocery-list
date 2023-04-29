const swaggerJsdoc = require("swagger-jsdoc");
const PORT = process.env.PORT;
// imports properties
const paths = require('./paths');
const components = require('./components');

const swaggerDefinition = {
    "openapi":"3.0.2",
    "info": {
      "title":"My grocery list API",
      "version":"1.0",
      "description":"API for a grocery list app",
    },
    "servers": [
        {
            "url":`http://localhost:${PORT}/v1`,
            "description":"Development server"
        }
    ],
    "tags": [
        {
          "name": "Item",
          "description": "An item you want to buy"
        },
        {
          "name": "Brand",
          "description": "The brand of an item"
        },
        {
          "name": "Category",
          "description": "The category of an item corresponding on how you sort it"
        },
        {
          "name": "Shelf",
          "description": "The shelf where you can find an item in your favorite store"
        },
    ],
    paths,
    components

};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions relative
    // to the root directory of the API
    apis: ["../app/*/*/*.js"],
}

const swaggerSpecifications = swaggerJsdoc(options);


module.exports = swaggerSpecifications;
