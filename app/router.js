//import controllers
const genericController = require('./controllers/genericController');
const itemController = require('./controllers/itemController');

//import middlewares
const {addModelInRequest} = require('./middlewares/getModelName');


const { Router }  = require('express');
const router = Router();

/**
 * all items filtered for one <category | brand |shelf>
 * @param {string}  items what we are looking for (eg.: items)
 * @param {string} filter name of the filter we are applying (eg.: brand)
 * @param {number} id id of the filter we want to find items corresponding
 */
router.route('/items/filter')
  .get(itemController.findByFilter);

//Dynamic routes with model name taken in params and given to controller with addModelInRequest middleware
/**
 * @param {string} modelName name of the model we want to get (taken in params and given to controller)
*/
router.route('/:modelName')
  .all(addModelInRequest)
  .get(genericController.findAll) //find all the elements correponding to the model name
  .post(genericController.save); //save an element in the model table

  /**
 * @param {number} id the id of the element to get
 */
router.route('/:modelName/:id')
  .all(addModelInRequest)
  .get(genericController.findOne)//find one element corresponding to the id
  .patch(genericController.save); //update one element corresponding to the id


/**
 * In case no one answers
 *
 */
router.use((_, response) => response.status(404).json({error: 'Endpoint non trouvé'}));

module.exports = router;
