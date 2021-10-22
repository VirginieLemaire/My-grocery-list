//importer le controller
const itemController = require('./controllers/itemController');
const brandController = require('./controllers/brandController');
const shelfController = require('./controllers/shelfController');
const categoryController = require('./controllers/categoryController');
const genericController = require('./controllers/genericController');


//importer le(s) middleware(s) et utilitaire(s)
const {addModelInRequest} = require('./middlewares/getModelName');
const {catching} = require('./utils/catching');


const { Router }  = require('express');
const router = Router();

//ITEMS
//all items
//router.get('/items', itemController.findAll);
//1 item
router.get('/items/:id', itemController.findOne);
//all items for one category
router.get('/items/category/:id', itemController.findByCategory);
//all items for one brand 
router.get('/items/brand/:id', itemController.findByBrand);
//all items for one shelf 
router.get('/items/shelf/:id', itemController.findByShelf);

//BRAND
//all brands
// router.get('/brands', brandController.findAll);
//1 brand
router.get('/brands/:id', brandController.findOne);

//SHELF
//all shelves
// router.get('/shelves', shelfController.findAll);
//1 shelf
router.get('/shelves/:id', shelfController.findOne);

//CATEGORY
//all categories
// router.get('/categories', categoryController.findAll);
//1 brand
router.get('/categories/:id', categoryController.findOne);

//REFACTO
// On utilise des routes avec un nom de modèle en paramètre
router.route('/:modelName')
  // utilisation du middleware addModelInRequest avant les autres méthodes
  .all(addModelInRequest)
  .get(catching(genericController.findAll));

/**
 * Une route au cas où aucune ne réponde
 * 
 */
router.use((_, response) => response.status(404).json('Endpoint non trouvé'));
 
module.exports = router;