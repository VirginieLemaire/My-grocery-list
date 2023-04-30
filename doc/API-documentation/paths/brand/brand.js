module.exports = {
    "get": {
        "tags": [
        "Brand"
        ],
        "summary": "One brand details",
        "description": "Give informations about one brand",
        "operationId": "getBrand",
        "parameters": [
        {
            "name": "brandId",
            "in": "path",
            "description": "The id of the brand to retrieve",
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
};