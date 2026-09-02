module.exports = {
    "get": {
        "tags": [
        "Category"
        ],
        "summary": "One category details",
        "description": "Give informations about one category",
        "operationId": "getCategory",
        "parameters": [
        {
            "name": "categoryId",
            "in": "path",
            "description": "The id of the category to retrieve",
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
                    "$ref": "#/components/schemas/Category"
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
    "patch": {
        "tags": [
        "Category"
        ],
        "summary": "Update a category",
        "description": "Update one or several fields of an existing category. Only the fields present in the body are changed.",
        "operationId": "updateCategory",
        "parameters": [
          {
              "name": "categoryId",
              "in": "path",
              "description": "The id of the category to update",
              "required": true,
              "schema": {
                  "type": "integer",
                  "example": 1
              }
          }
        ],
        "requestBody": {
        "content": {
            "application/json": {
            "schema": {
                "$ref": "#/components/requestBodies/patchCategory"
            }
            }
        }
        },
        "responses": {
        "200": {
            "description": "Updated. Sends the updated category.",
            "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Category"
                  }
                }
            }
        },
        "400": {
            "description": "Empty body: nothing to update",
            "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Il n'y a pas de données à enregistrer"
                      }
                    }
                  }
                }
            }
        },
        "404": {
            "description": "No category found for this id"
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
};