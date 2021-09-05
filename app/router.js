//importer le controller
const itemController = require('./controllers/itemController');
const brandController = require('./controllers/brandController');
const shelfController = require('./controllers/shelfController');

const { Router }  = require('express');
const router = Router();

//ITEMS
//all items
router.get('/items', itemController.findAll);
//1 item
router.get('/items/:id', itemController.findOne);
//all items for one category
router.get('/items/category/:id', itemController.findByCategory);
//all items for brand 
router.get('/items/brand/:id', itemController.findByBrand);
//all items for shelf 
router.get('/items/shelf/:id', itemController.findByShelf);

//BRAND
//all brands
router.get('/brands', brandController.findAll);
//1 brand
router.get('/brands/:id', brandController.findOne);

//SHELF
//all shelves
router.get('/shelves', shelfController.findAll);
//1 shelf
router.get('/shelves/:id', shelfController.findOne);

/**
 * Une route au cas où aucune ne réponde
 * 
 */
router.use((_, response) => response.status(404).json('Endpoint non trouvé'));
 
module.exports = router;