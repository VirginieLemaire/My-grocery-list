//fichier d'indexation des models présents dans le dossier (nécessaire pour Node.js)
const Brand = require('./brand');
const Category = require('./category');
const Item = require('./item');
const Shelf = require('./shelf');


module.exports = {
    Brand,
    Category,
    Item,
    Shelf
}