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
            const partOfQUery = ['WHERE '];
            const bind = []; //prepare bind needed for prepared instruction
            let count = 1;
            for (const key in queryString) {
                partOfQUery.push(`${key} ILIKE '%' || $${count++}  || '%' `);
                bind.push(`${queryString[key]}`)
            }
            //add 'AND' to the query if needed
            for (let i = 1; i < partOfQUery.length; i++) {
                if (i%2 === 0) partOfQUery.splice(i,0,'AND ');
            }
            //transform in a string and delete "," added by .join()
            const query = `${partOfQUery.join().replace(/,/g,"")}`;
            console.log(query);

            //send request
            const {rows} = await pool.query(`SELECT * FROM item_with_everything ${query}`, [...bind]);
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

    
}

module.exports = Item;