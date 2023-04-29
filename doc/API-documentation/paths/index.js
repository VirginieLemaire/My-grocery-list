const items = require('./item/items');
const item = require('./item/item');

module.exports = {
    "/items": items,
    "/items/{itemId}": item
};