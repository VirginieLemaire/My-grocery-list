//import controllers
const genericController = require('./controllers/genericController');
const itemController = require('./controllers/itemController');

//import middlewares and utils
const {addModelInRequest} = require('./middlewares/getModelName');
const {catching} = require('./utils/catching');


const { Router }  = require('express');
const router = Router();

/** 
 * Generic routes with model name taken in params and given to controller with addModelInRequest middleware
*/
router.route('/:modelName')
  .all(addModelInRequest)
  .get(catching(genericController.findAll));

  router.route('/:modelName/:id')
  .all(addModelInRequest)
  .get(catching(genericController.findOne));

//SPECIFIC FOR ITEMS
//all items for one category
router.get('/items/category/:id', itemController.findByCategory);
//all items for one brand 
router.get('/items/brand/:id', itemController.findByBrand);
//all items for one shelf 
router.get('/items/shelf/:id', itemController.findByShelf);


/**
 * In case no one answers
 * 
 */
router.use((_, response) => response.status(404).json('Endpoint non trouvé'));
 
module.exports = router;