module.exports = {
    "type": "object",
    "required": [
        "id",
        "name"
    ],
    "properties": {
        "id": {
            "type": "integer",
            "format": "int64",
            "example": 1
        },
        "name": {
            "type": "string",
            "example": "Pomme",
        },
        "details": {
            "type": "string",
            "example": "Bio",
        },
        "brand_id": {
            "type": "integer",
            "format": "int64",
            "example": 1
        },
        "category_id": {
            "type": "integer",
            "format": "int64",
            "example": 1
        },
        "shelf_id": {
            "type": "integer",
            "format": "int64",
            "example": 1
        },
        "brand": {
            "type": ["string", "null"],
            "example": "null",
        },
        "category": {
          "type": ["string", "null"],
          "example": "Fruits",
         },
        "shelf": {
          "type": ["string", "null"],
          "example": "Fruits - légumes",
        },
    }
};