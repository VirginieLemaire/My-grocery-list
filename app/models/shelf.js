const Generic = require('./generic');

/**
 * An entity representing a shelf
 * @typedef Shelf
 * @property {string} name shelf name
*/

/**
 * @class Shelf
 */
class Shelf extends Generic {
    /**
     * Constructor, has parent properties
     * @param {*} obj a literal object with properties copied into the instance
     */
    constructor(obj) {
        super(obj);
    }

}

module.exports = Shelf;