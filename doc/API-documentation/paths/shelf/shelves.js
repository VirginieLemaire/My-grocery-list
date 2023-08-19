module.exports = {
    "get": {
        "tags": [
        "Shelf"
        ],
        "summary": "List of all shelves",
        "description": "Give a list of all shelves known in the database",
        "operationId": "getShelves",
        "responses": {
        "200": {
            "description": "A page array of shelves",
            "content": {
            "application/json; charset=utf-8": {
                "schema": {
                    "$ref": "#/components/schemas/Shelves"
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
        "Shelf"
        ],
        "summary": "Create a new shelf",
        "description": "Add a new shelf in the database, with its informations",
        "operationId": "addShelves",
        "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "$ref": "#/components/requestBodies/postShelf"
                }
            }
        }
        },
        "responses": {
        "201": {
            "description": "Created. Send an object containing the informations about the new shelf",
            "content": {
            "application/json; charset=utf-8": {
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
}