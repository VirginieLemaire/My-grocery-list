module.exports = {
    "get": {
        "tags": [
        "Item"
        ],
        "summary": "List of all items applying a filter",
        "description": "Give a list of filtered items by brand, category and / or shelf",
        "operationId": "filterItems",
        "parameters": [
            {
                "name": "category",
                "in": "query",
                "description": "The name of the category to apply to the items",
                "required": false,
                "schema": {
                    "type": "string",
                    "example": "Friandises"
                }
            },
            {
                "name": "shelf",
                "in": "query",
                "description": "The name of the shelf to apply to the items",
                "required": false,
                "schema": {
                    "type": "string",
                    "example": "Epicerie"
                }
            },
            {
                "name": "brand",
                "in": "query",
                "description": "The name of the brand to apply to the items",
                "required": false,
                "schema": {
                    "type": "string",
                    "example": "Lindt"
                }
            }
          ],
        "responses": {
        "200": {
            "description": "A page array of items",
            "content": {
            "application/json; charset=utf-8": {
                "schema": {
                "$ref": "#/components/schemas/Items"
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
}