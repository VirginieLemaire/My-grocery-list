module.exports = {
    "get": {
        "tags": [
        "Shelf"
        ],
        "summary": "One shelf details",
        "description": "Give informations about one shelf",
        "operationId": "getShelf",
        "parameters": [
        {
            "name": "shelfId",
            "in": "path",
            "description": "The id of the shelf to retrieve",
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
                    "$ref": "#/components/schemas/Shelf"
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
        "Shelf"
        ],
        "summary": "Update a shelf",
        "description": "Update one or several fields of an existing shelf. Only the fields present in the body are changed.",
        "operationId": "updateShelf",
        "parameters": [
          {
              "name": "shelfId",
              "in": "path",
              "description": "The id of the shelf to update",
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
                "$ref": "#/components/requestBodies/patchShelf"
            }
            }
        }
        },
        "responses": {
        "200": {
            "description": "Updated. Sends the updated fields, wrapped under \"update_table_dynamic\" (as returned by the underlying SQL function).",
            "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "update_table_dynamic": {
                        "$ref": "#/components/schemas/Shelf"
                      }
                    }
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
            "description": "No shelf found for this id"
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