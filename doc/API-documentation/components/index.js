// schemas
const Item = require('./schemas/Item');
// requestBodies
const {postItem} = require('./requestBodies/Item');

module.exports = {
    "schemas": {
        Item,
        "Items": {
            "type": "array",
            "items": {
                "$ref": "#/components/schemas/Item"
            }
        },
        "Error": {
            "type": "object",
            "required": [
              "code",
              "message"
            ],
            "properties": {
              "code": {
                "type": "integer",
                "format": "int32"
              },
              "message": {
                "type": "string"
              }
            }
        }            
    },
    "requestBodies": {
      postItem
    },
}