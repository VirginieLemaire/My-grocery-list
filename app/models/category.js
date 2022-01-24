const Generic = require('./generic');

/**
 * An entity representing a category
 * @typedef Category
 * @property {string} name category name
*/

/**
 * @class Category
 */
class Category extends Generic {
    /**
     * Constructor, has parent properties
     * @param {*} obj a literal object with properties copied into the instance
     */
    constructor(obj) {
        super(obj);
    }
    
}

module.exports = Category;