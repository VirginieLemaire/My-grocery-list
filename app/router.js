//importer le controller
const itemController = require('./controllers/itemController');

const { Router }  = require('express');
const router = Router();

//afficher tous les articles
router.get('/items', itemController.findAll);

//afficher 1 article
router.get('/items/:id', itemController.findOne);

//afficher les articles par catégorie
router.get('/items/category/:id', itemController.findByCategory);

//les articles par marque
router.get('/items/brand/:id', itemController.findByBrand);
// les articles par rayon
router.get('/items/shelf/:id', itemController.findByShelf);
/**
 * Une route au cas où aucune ne réponde
 * 
 */
router.use((_, response) => response.status(404).json('Endpoint non trouvé'));
 
module.exports = router;