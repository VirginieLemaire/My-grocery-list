const pool = require('../database');

/**
 * An entity representing a category
 * @typedef Category
 * @property {string} name category name
*/

/**
 * @class Category
 */
class Category {
    /**
     * The Category constuctor
     * @param {Object} obj a literal object with properties copied into the instance
     */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    //get all categories
    /**
     * Fetches all categories in the database
     * @returns {Array<Category>} 
     * @async
     * @static
     */
    static async findAll() {
        try {
            const {rows} = await pool.query('SELECT * FROM category');
            return rows.map(row => new Category(row));
        } catch (error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
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