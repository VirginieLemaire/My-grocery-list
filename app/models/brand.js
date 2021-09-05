const pool = require('../database');

/**
 * An entity representing a brand
 * @typedef Brand
 * @property {string} name brand name
*/

/**
 * @class Brand
 */
class Brand {
    /**
     * The Brand constuctor
     * @param {Object} obj a literal object with properties copied into the instance
     */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    //get all brands
    /**
     * Fetches all brands in the database
     * @returns {Array<Brand>} 
     * @async
     * @static
     */
    static async findAll() {
        try {
            const {rows} = await pool.query('SELECT * FROM brand');
            return rows.map(row => new Brand(row));
        } catch (error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
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