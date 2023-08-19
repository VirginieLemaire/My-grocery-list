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
};