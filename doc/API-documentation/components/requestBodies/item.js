const postItem =  {
    "type": "object",
    "required": [
        "name"
    ],
    "properties": {
        "name": {
            "type": "string",
            "example": "Poire",
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
    }
};

module.exports = {postItem};