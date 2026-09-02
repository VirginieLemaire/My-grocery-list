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
    "patch": {
        "tags": [
        "Brand"
        ],
        "summary": "Update a brand",
        "description": "Update one or several fields of an existing brand. Only the fields present in the body are changed.",
        "operationId": "updateBrand",
        "parameters": [
          {
              "name": "brandId",
              "in": "path",
              "description": "The id of the brand to update",
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
                "$ref": "#/components/requestBodies/patchBrand"
            }
            }
        }
        },
        "responses": {
        "200": {
            "description": "Updated. Sends the updated brand.",
            "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Brand"
                  }
                }
            }
        },
        "400": {
            "description": "Empty body: nothing to update",
            "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
            }
        },
        "404": {
            "description": "No brand found for this id",
            "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
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