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