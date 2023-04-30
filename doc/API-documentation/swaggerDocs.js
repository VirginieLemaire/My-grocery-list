const swaggerJsdoc = require("swagger-jsdoc");
const PORT = process.env.PORT;
// imports properties
const paths = require('./paths');
const components = require('./components');
const customCss = require('./customCSS');

const swaggerDefinition = {
    "openapi":"3.0.2",
    "info": {
      "title":"My grocery list API - documentation",
      "version":"1.0",
      "description":"Welcome to the documentation of the API that allows you to create a grocery list",
      "contact": {
        "name": "profil GitHub de Virginie",
        "url": "https://github.com/VirginieLemaire",
      }
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
    apis: ["../app/*/*/*.js"]
}

const swaggerSpecifications = swaggerJsdoc(options);

const cssOptions = {
  customCss : customCss,
  customSiteTitle: "Documentation of My Grocery list API",
};


module.exports = { swaggerSpecifications, cssOptions };