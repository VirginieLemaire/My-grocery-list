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
     * Fetches all items with the given category from the database
     * @param {*} catId id of the category we're looking for 
     * @returns {Array<Item>} can be empty with unexisting or unpopular category
     * @async
     * @static
     */
    static async findByCategory(catId) {
        try {
            const {rows} = await pool.query('SELECT * FROM item_with_everything WHERE category_id=$1', [catId]);
            return rows.map(row => new Item(row));
        } catch (error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }

    }

    /**
     * Fetches all items with the given brand from the database
     * @param {*} brandId id of the brand we're looking for 
     * @returns {Array<Item>} can be empty with unexisting or unpopular brand
     * @async
     * @static
     */
     static async findByBrand(brandId) {
        try {
            const {rows} = await pool.query('SELECT * FROM item_with_everything WHERE brand_id=$1', [brandId]);
            return rows.map(row => new Item(row));
        } catch (error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    /**
     * Fetches all shelves with the given brand from the database
     * @param {*} shelfId id of the shelf we're looking for 
     * @returns {Array<Item>} can be empty with unexisting or unpopular shelf
     * @async
     * @static
     */
     static async findByShelf(shelfId) {
        try {
            const {rows} = await pool.query('SELECT * FROM item_with_everything WHERE shelf_id=$1', [shelfId]);
            return rows.map(row => new Item(row));
        } catch (error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
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
    //TODO factoriser les findBy
    
}

module.exports = Item;