const { Router }  = require('express');
const router = Router();

//router.get('/maroute', monController.methode);

/**
 * Une route au cas où aucune ne réponde
 * 
 */
router.use((_, response) => response.status(404).json('Endpoint non trouvé'));
 
module.exports = router;