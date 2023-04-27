const swaggerJsdoc = require("swagger-jsdoc");
const PORT = process.env.PORT;

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
    "paths": {
        "/items": {
            "get": {
              "tags": [
                "Item"
              ],
              "summary": "List of all items",
              "description": "Give a list of all items known in the database, with informations like brand, category or shelf",
              "operationId": "getItems",
              "responses": {
                "200": {
                  "description": "A page array of items",
                  "content": {
                    "application/json; charset=utf-8": {
                      "schema": {
                        "$ref": "#//Items"
                        }
                    }
                  }
                },
                "default": {
                    "description": "unexpected error",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/Error"
                        }
                      }
                    }
                }
              },
          },
          "post": {
            "tags": [
              "Item"
            ],
            "summary": "Create a new item",
            "description": "Add a new item in the database, with informations like brand, category or shelf",
            "operationId": "addItems",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/requestBodies/Item"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "An object containing the id of the new item",
                "content": {
                  "application/json; charset=utf-8": {
                    "schema": {
                      "$ref": "#/components/schemas/Item"
                      }
                  }
                }
              },
              "default": {
                  "description": "unexpected error",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
              }
            },
        },
        },
        "/items/{itemId}": {
        "get": {
            "tags": [
            "Item"
            ],
            "summary": "One item details",
            "description": "Give informations about one item",
            "operationId": "getItem",
            "parameters": [
            {
                "name": "itemId",
                "in": "path",
                "description": "The id of the item to retrieve",
                "required": true,
                "schema": {
                    "type": "integer",
                    "example": 1
                }
            }
            ],
            "responses": {
            "200": {
                "description": "Successful operation",
                "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Item"
                      }
                    }
                }
            },
            "default": {
                "description": "unexpected error",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Error"
                    }
                  }
                }
            }
            },
        },
        },
    },
    "components": {
        "schemas": {
            "Item": {
                "type": "object",
                "required": [
                    "id",
                    "name"
                ],
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int64",
                        "example": 1
                    },
                    "name": {
                        "type": "string",
                        "example": "Pomme",
                    },
                    "details": {
                        "type": "string",
                        "example": "Bio",
                    },
                    "brand_id": {
                        "type": "integer",
                        "format": "int64",
                        "example": 1
                    },
                    "category_id": {
                        "type": "integer",
                        "format": "int64",
                        "example": 1
                    },
                    "shelf_id": {
                        "type": "integer",
                        "format": "int64",
                        "example": 1
                    },
                }
            },
            "Items": {
                "type": "array",
                "items": {
                    "$ref": "#/components/schemas/Item"
                }
            },
            "Error": {
                "type": "object",
                "required": [
                  "code",
                  "message"
                ],
                "properties": {
                  "code": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "message": {
                    "type": "string"
                  }
                }
            }            
        },
        "requestBodies": {
          "Item": {
              "type": "object",
              "required": [
                  "name"
              ],
              "properties": {
                  "name": {
                      "type": "string",
                      "example": "Poire",
                  },
                  "details": {
                      "type": "string",
                      "example": "Bio",
                  },
                  "brand_id": {
                      "type": "integer",
                      "format": "int64",
                      "example": 1
                  },
                  "category_id": {
                      "type": "integer",
                      "format": "int64",
                      "example": 1
                  },
                  "shelf_id": {
                      "type": "integer",
                      "format": "int64",
                      "example": 1
                  },
              }
          },
    },
  }

};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions relative
    // to the root directory of the API
    apis: ["../app/*/*/*.js"],
}

const swaggerSpecifications = swaggerJsdoc(options);


module.exports = swaggerSpecifications;
