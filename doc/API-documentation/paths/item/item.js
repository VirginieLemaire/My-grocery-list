module.exports = {
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
            "$ref": "#/components/responses/UnexpectedError"
        }
        },
    },
    "patch": {
        "tags": [
        "Item"
        ],
        "summary": "Update an item",
        "description": "Update one or several fields of an existing item. Only the fields present in the body are changed.",
        "operationId": "updateItem",
        "parameters": [
          {
              "name": "itemId",
              "in": "path",
              "description": "The id of the item to update",
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
                "$ref": "#/components/requestBodies/patchItem"
            }
            }
        }
        },
        "responses": {
        "200": {
            "description": "Updated. Sends the updated item.",
            "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Item"
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