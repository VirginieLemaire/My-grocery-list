const items = require('./item/items');
const item = require('./item/item');
const filteredItems = require('./item/items-filtered');
const categories = require('./category/categories');
const category = require('./category/category');
const shelf = require('./shelf/shelf');
const shelves = require('./shelf/shelves');
const brand = require('./brand/brand');
const brands = require('./brand/brands');


module.exports = {
    "/items": items,
    "/items/{itemId}": item,
    "/items/filter": filteredItems,
    "/categories": categories,
    "/categories/{categoryId}": category,
    "/shelves": shelves,
    "/shelves/{shelfId}": shelf,
    "/brands": brands,
    "/brands/{brandId}": brand
};