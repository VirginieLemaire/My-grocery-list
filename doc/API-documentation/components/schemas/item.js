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
        "brand": {
            "type": ["string", "null"],
            "example": "Biotiful",
        },
        "category_id": {
            "type": "integer",
            "format": "int64",
            "example": 1
        },
        "category": {
          "type": ["string", "null"],
          "example": "Fruits",
         },
         "shelf_id": {
             "type": "integer",
             "format": "int64",
             "example": 1
         },
        "shelf": {
          "type": ["string", "null"],
          "example": "Fruits - légumes",
        },
    }
};