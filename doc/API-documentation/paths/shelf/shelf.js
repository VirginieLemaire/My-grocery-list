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
            "$ref": "#/components/responses/UnexpectedError"
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
            "description": "Updated. Sends the updated shelf.",
            "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shelf"
                  }
                }
            }
        },
        "400": {
            "$ref": "#/components/responses/BadRequest"
        },
        "404": {
            "$ref": "#/components/responses/NotFound"
        },
        "default": {
            "$ref": "#/components/responses/UnexpectedError"
        }
        },
    },
};