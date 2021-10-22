const Generic = require('./generic');

/**
 * An entity representing a brand
 * @typedef Brand
 * @property {string} name brand name
*/

/**
 * @class Brand
 */
class Brand extends Generic {
    /**
     * Constructor, has parent properties
     * @param {*} obj a literal object with properties copied into the instance
     */
    constructor(obj) {
        super(obj);
    }
    
}

module.exports = Brand;