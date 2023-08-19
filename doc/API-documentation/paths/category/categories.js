module.exports = {
    "get": {
        "tags": [
        "Category"
        ],
        "summary": "List of all categories",
        "description": "Give a list of all categories known in the database",
        "operationId": "getCategories",
        "responses": {
        "200": {
            "description": "A page array of categories",
            "content": {
            "application/json; charset=utf-8": {
                "schema": {
                    "$ref": "#/components/schemas/Categories"
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
        "Category"
        ],
        "summary": "Create a new category",
        "description": "Add a new category in the database",
        "operationId": "addCategories",
        "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "$ref": "#/components/requestBodies/postCategory"
                }
            }
        }
        },
        "responses": {
        "201": {
            "description": "Created. Send an object containing the informations about the new category",
            "content": {
            "application/json; charset=utf-8": {
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
}