const pool = require('../database');
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