const pool = require('../database');
const Generic = require('./generic');

/**
 * An entity representing an item
 * @typedef Item
 * @property {string} name name of the item
 * @property {string} details details or comments about this item (if needed)
 * @property {string} brand brand (if needed)
 * @property {string} category personalised category as you categorise at home, "breakfast" for example (if needed)
 * @property {string} shelf store shelf where you usually find this item
*/

/**
 * @class Item
 */
class Item extends Generic {
    /**
     * Constructor, has parent properties
     * @param {*} obj a literal object with properties copied into the instance
     */
    constructor(obj) {
        super(obj);
    }

    /**
     * Fetches the items applying filter(s) (eg. for one category)
     * @param {object} queryString correspond to the filter(s) applied
     * @returns {Array<Items>} an array of items corresponding to the filter (maybe empty)
     */
    static async findByFilter(queryString) {
        try {
            //Construct prepared instruction depending on what is in queryString
            const keys = Object.keys(queryString);
            const bind = keys.map(key => `${queryString[key]}`); //prepare bind needed for prepared instruction
            const whereClause = keys.length
                ? `WHERE ${keys.map((key, index) => `${key} ILIKE '%' || $${index + 1} || '%'`).join(' AND ')}`
                : '';

            //send request
            const {rows} = await pool.query(`SELECT * FROM item_with_everything ${whereClause}`, bind);
            return rows.map(row => new Item(row));
        } catch (error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message, { cause: error });
        }
    }


    //TODO Ajouter un article dans la base de données

    //  async save() {
    //     try {
    //         if (this.id) {
    //             //TODO modifier un article dans la base de données
    //             console.log('cet article existe déjà : le mettre à jour?');
                
    //         } else {
    //             const {rows} = await pool.query('INSERT INTO item (name, details, brand_id, category_id, shelf_id) VALUES($1, $2, $3, $4, $5) RETURNING id', [
    //                 this.name,
    //                 this.details,
    //                 this.brand_id,
    //                 this.category_id,
    //                 this.shelf_id
    //             ]);
    //             this.id = rows[0].id;
    //         }
    //     } catch (error) {
    //         console.log('Erreur SQL', error.detail);
    //         //relancer l'erreur pout que le controller puisse l'attrapper et la renvoyer au front
    //         throw new Error(error.detail ? error.detail : error.message);
    //     }
    // }
    //TODO supprimer un article de la base de données

    
}

module.exports = Item;