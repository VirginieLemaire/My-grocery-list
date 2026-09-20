//index file listing the models present in the folder (required for Node.js)
const Brand = require("./brand");
const Category = require("./category");
const Item = require("./item");
const Shelf = require("./shelf");

module.exports = {
	Brand,
	Category,
	Item,
	Shelf,
};
