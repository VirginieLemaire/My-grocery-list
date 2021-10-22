const pool = require('../database');
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


    //get one category identified by its id
    /**
     * Fetches a single category from the database
     * @param {number} id id the category we're looking for
     * @returns {Category | null} null if no category matches the given id in database
     * @async
     * @static
     */
    static async findById(id) {
        try {
            const {rows} = await pool.query('SELECT * FROM category WHERE id=$1', [id]);
            if (rows[0]) {
                return new Category(rows[0]);
            }
            return null;

        } catch(error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    
}

module.exports = Category;