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
};