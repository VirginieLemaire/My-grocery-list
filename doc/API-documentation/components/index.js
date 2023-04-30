// schemas
const Item = require('./schemas/item');
const Category = require('./schemas/category');
const Shelf = require('./schemas/shelf');
const Brand = require('./schemas/brand');  
// requestBodies
const {postItem} = require('./requestBodies/item');
const {postCategory} = require('./requestBodies/category');
const {postShelf} = require('./requestBodies/shelf');
const {postBrand} = require('./requestBodies/brand');

module.exports = {
    "schemas": {
      Item,
      "Items": {
          "type": "array",
          "items": {
              "$ref": "#/components/schemas/Item"
          }
      },
      Category,
      "Categories": {
        "type": "array",
        "items": {
            "$ref": "#/components/schemas/Category"
        }
      },
      Shelf,
      "Shelves": {
        "type": "array",
        "items": {
            "$ref": "#/components/schemas/Shelf"
        }
      },
      Brand,
      "Brands": {
        "type": "array",
        "items": {
            "$ref": "#/components/schemas/Brand"
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
      postItem,
      postCategory,
      postShelf,
      postBrand
    },
}