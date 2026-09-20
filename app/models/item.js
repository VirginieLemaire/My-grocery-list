const pool = require("../database");
const { logger } = require("../logger");
const Generic = require("./generic");

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
	 * Fetches the items applying filter(s) (eg. for one category)
	 * @param {object} queryString correspond to the filter(s) applied
	 * @returns {Array<Items>} an array of items corresponding to the filter (maybe empty)
	 */
	static async findByFilter(queryString) {
		try {
			//Construct prepared instruction depending on what is in queryString
			const keys = Object.keys(queryString);
			const bind = keys.map((key) => `${queryString[key]}`); //prepare bind needed for prepared instruction
			const whereClause = keys.length
				? `WHERE ${keys.map((key, index) => `${key} ILIKE '%' || $${index + 1} || '%'`).join(" AND ")}`
				: "";

			//send request
			const { rows } = await pool.query(
				`SELECT * FROM item_with_everything ${whereClause}`,
				bind,
			);
			return rows.map((row) => new Item(row));
		} catch (error) {
			logger.error(
				{ err: error, table: "item", filter: queryString },
				"Erreur lors de la recherche filtrée en base de données",
			);
			throw new Error(error.detail ? error.detail : error.message, {
				cause: error,
			});
		}
	}
}

module.exports = Item;
