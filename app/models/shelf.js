const pool = require('../database');

/**
 * An entity representing a shelf
 * @typedef Shelf
 * @property {string} name shelf name
*/

/**
 * @class Shelf
 */
class Shelf {
    /**
     * The Shelf constuctor
     * @param {Object} obj a literal object with properties copied into the instance
     */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    //get all shelves
    /**
     * Fetches all shelves in the database
     * @returns {Array<Shelf>} 
     * @async
     * @static
     */
    static async findAll() {
        try {
            const {rows} = await pool.query('SELECT * FROM shelf');
            return rows.map(row => new Shelf(row));
        } catch (error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    //get one shelf identified by its id
    /**
     * Fetches a single shelf from the database
     * @param {number} id id the shelf we're looking for
     * @returns {Shelf | null} null if no shelf matches the given id in database
     * @async
     * @static
     */
    static async findById(id) {
        try {
            const {rows} = await pool.query('SELECT * FROM shelf WHERE id=$1', [id]);
            if (rows[0]) {
                return new Shelf(rows[0]);
            }
            return null;

        } catch(error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }
}

module.exports = Shelf;