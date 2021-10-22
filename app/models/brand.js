const pool = require('../database');
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


    //get one brand identified by its id
    /**
     * Fetches a single brand from the database
     * @param {number} id id the brand we're looking for
     * @returns {Brand | null} null if no brand matches the given id in database
     * @async
     * @static
     */
    static async findById(id) {
        try {
            const {rows} = await pool.query('SELECT * FROM brand WHERE id=$1', [id]);
            if (rows[0]) {
                return new Brand(rows[0]);
            }
            return null;

        } catch(error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    
}

module.exports = Brand;