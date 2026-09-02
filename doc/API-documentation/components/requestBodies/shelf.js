const postShelf =  {
    "type": "object",
    "required": [
        "name"
    ],
    "properties": {
        "name": {
            "type": "string",
            "example": "Saisonnier",
        }
    }
};

// no "required" field: a PATCH only needs the fields being changed
const patchShelf =  {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "example": "Saisonnier",
        }
    }
};

module.exports = {postShelf, patchShelf};
