const postBrand =  {
    "type": "object",
    "required": [
        "name"
    ],
    "properties": {
        "name": {
            "type": "string",
            "example": "Marque repère",
        }
    }
};

// no "required" field: a PATCH only needs the fields being changed
const patchBrand =  {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "example": "Marque repère",
        }
    }
};

module.exports = {postBrand, patchBrand};
