const pool = require('../database');

/**
 * Entité représentant un article pour une liste d'achats
 * @typedef Post
 * @property {string} name nom de l'article ex: "beurre 1/2 sel"
 * @property {string} details détail ou commentaire au sujet de l'article (si besoin)
 * @property {string} brand marque (si besoin)
 * @property {string} category catégorie personnalisée de l'article ex: Petit-dej 
 * @property {string} shelf rayon où trouver l'article
*/

/**
 * @class Item
 */
class Item {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    //récupérer tous les items (articles)
    /**
     * Récupère tous les articles de la base de données
     * @returns {Array<Item>} un tableau d'articles
     * @async
     * @static
     */
    static async findAll() {
        try {
            const {rows} = await pool.query('SELECT * FROM item_with_everything');
            return rows.map(row => new Item(row));
        } catch (error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    //récupérer un item (article) en fonction de son id
    /**
     * Récupère 1 article de la base de données
     * @param {number} id id de l'article qu'on recherche
     * @returns {Item | null} null : s'il n'y a pas d'article correspondant dans la base de données
     * @async
     * @static
     */
    static async findById(id) {
        try {
            const {rows} = await pool.query('SELECT * FROM item_with_everything WHERE id=$1', [id]);
            if (rows[0]) {
                return new Item(rows[0]);
            }
            return null;

        } catch(error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    //récupérer une liste d'articles d'une catégorie identifiée par son id
    /**
     * Récupére une liste d'articles d'une catégorie identifiée par son id
     * @param {*} catId id de la catégorie qu'on recherche
     * @returns {Array<Item>} peut être vide si la catégorie n'existe pas ou si elle ne possède pas d'article
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

    //récupérer une liste d'articles d'une marque identifiée par son id
    /**
     * Récupére une liste d'articles d'une marque identifiée par son id
     * @param {*} brandId id de la marque qu'on recherche
     * @returns {Array<Item>} peut être vide si la marque n'existe pas ou si elle ne possède pas d'article
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

    //récupérer une liste d'articles d'un rayon identifié par son id
    /**
     * Récupére une liste d'articles d'un rayon identifié par son id
     * @param {*} shelfId id du rayon qu'on recherche
     * @returns {Array<Item>} peut être vide si le rayon n'existe pas ou s'il ne possède pas d'article
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
    //TODO modifier un article dans la base de données (update, delete)
    //TODO factoriser les findBy
    
}

module.exports = Item;