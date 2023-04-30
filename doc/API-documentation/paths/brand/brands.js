module.exports = {
    "get": {
        "tags": [
        "Brand"
        ],
        "summary": "List of all brands",
        "description": "Give a list of all brands known in the database",
        "operationId": "getBrands",
        "responses": {
        "200": {
            "description": "A page array of brands",
            "content": {
            "application/json; charset=utf-8": {
                "schema": {
                    "$ref": "#/components/schemas/Brands"
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
        "Brand"
        ],
        "summary": "Create a new brand",
        "description": "Add a new brand in the database, with its informations",
        "operationId": "addBrands",
        "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "$ref": "#/components/requestBodies/postBrand"
                }
            }
        }
        },
        "responses": {
        "201": {
            "description": "Created. Send an object containing the informations about the new brand",
            "content": {
            "application/json; charset=utf-8": {
                "schema": {
                    "$ref": "#/components/schemas/Brand"
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