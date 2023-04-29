module.exports = {
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
                "$ref": "#/components/requestBodies/postItem"
            }
            }
        }
        },
        "responses": {
        "201": {
            "description": "Created",
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
}