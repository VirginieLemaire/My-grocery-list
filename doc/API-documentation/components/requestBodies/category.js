const postCategory =  {
    "type": "object",
    "required": [
        "name"
    ],
    "properties": {
        "name": {
            "type": "string",
            "example": "Boissons",
        }
    }
};

// no "required" field: a PATCH only needs the fields being changed
const patchCategory =  {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "example": "Boissons",
        }
    }
};

module.exports = {postCategory, patchCategory};
