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
            "example": "Friandises",
        },
    }
};