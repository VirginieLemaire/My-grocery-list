const pool = require("../database");

const tableInterpolation = (modelTableName) => {
	const models = require("./index");
	// build the list of all table names in lowercase
	const tableList = Object.keys(models).map((name) => name.toLowerCase());

	if (!tableList.includes(modelTableName)) {
		const tableNameError = new Error(`erreur : cette table n'existe pas`);
		tableNameError.status = 400;
		throw tableNameError;
	}
};

class Generic {
	/**
	 * Constructor
	 * @param {Object} obj a literal object with properties copied into the instance
	 */
	constructor(obj = {}) {
		for (const propName in obj) {
			this[propName] = obj[propName];
		}
	}

	/**
	 * Generic method to fetch all rows of a table in the database
	 * @param {object} datas object containing model & table names
	 * @returns {Array<model>}
	 * @async
	 * @static
	 */
	static async findAll(datas) {
		try {
			// check if table exists
			tableInterpolation(datas.modelTableName);

			// Select postgreSQL's view "item_with_everything" instead of table 'item' if we're looking for items to retrieve all the informations (id and name of brand, category and shelf)
			const table =
				datas.modelTableName === "item"
					? "item_with_everything"
					: datas.modelTableName;

			const { rows } = await pool.query(`SELECT * FROM ${table}`);
			return rows.map((row) => new datas.model(row));
		} catch (error) {
			console.log(error);
			if (error.status) throw error;
			throw new Error(error.detail ? error.detail : error.message, {
				cause: error,
			});
		}
	}

	/**
	 * Generic method to fetch a single row from the database
	 * @param {number} id id in the <tablename> we're looking for
	 * @returns {<tablename> | null} null if no <tablename> matches the given id in database
	 * @async
	 * @static
	 */
	static async findById(datas, id) {
		try {
			// check if table exists
			tableInterpolation(datas.modelTableName);
			// Select view item_with_everything instead of table 'item' if we're looking for items ti retrieve all the informations (id and name of brand, category and shelf)
			const table =
				datas.modelTableName === "item"
					? "item_with_everything"
					: datas.modelTableName;

			const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id=$1`, [
				id,
			]);
			if (rows[0]) {
				return new datas.model(rows[0]);
			}
			return null;
		} catch (error) {
			console.log(error);

			if (error.status) throw error;

			throw new Error(error.detail ? error.detail : error.message, {
				cause: error,
			});
		}
	}

	/**
	 * Generic method to save a new row in a table
	 * @param {object} datas object containing model & table names
	 * @param {object} body object containing the data to save
	 * @returns {<tablename> | null} null if no <tablename> matches the given id in database
	 * @async
	 */
	async create() {
		try {
			// check if table exists
			tableInterpolation(this.modelTableName);
			// console.log("body", this.body);
			const { rows } = await pool.query(
				`INSERT INTO ${this.modelTableName} (${Object.keys(this.body).join(", ")}) VALUES (${Object.keys(
					this.body,
				)
					.map((_, index) => `$${index + 1}`)
					.join(", ")}) RETURNING *`,
				Object.values(this.body),
			);

			if (rows[0]) {
				// console.log(rows[0]);
				return rows[0];
			} else {
				throw new Error(`Can't record in table ${this.modelTableName}`);
			}
		} catch (error) {
			console.log(error);

			if (error.status) throw error;

			// 23505 = duplicate key value violates unique constraint: an element
			// with the same key already exists -> conflict, not a server error
			if (error.code === "23505") {
				const conflictError = new Error(
					`Création impossible : ce nom existe déjà`,
				);
				conflictError.status = 409;
				throw conflictError;
			}
			throw new Error(error.detail ? error.detail : error.message, {
				cause: error,
			});
		}
	}

	async update() {
		try {
			// check if table exists
			tableInterpolation(this.modelTableName);
			const changingDatas = {
				id: parseInt(this.id, 10),
				...this.body,
			};

			const { rows } = await pool.query(`SELECT update_table_dynamic($1,$2)`, [
				this.modelTableName,
				changingDatas,
			]);

			// SELECT update_table_dynamic(...) always returns exactly one row,
			// wrapped under the function's own name; its value is null when no
			// row matched the given id
			return rows[0].update_table_dynamic;
		} catch (error) {
			console.log(error);

			if (error.status) throw error;

			// 23505 = duplicate key value violates unique constraint: an element
			// with the same key already exists -> conflict, not a server error
			if (error.code === "23505") {
				const conflictError = new Error(
					`Modification impossible : ce nom existe déjà`,
				);
				conflictError.status = 409;
				throw conflictError;
			}
			throw new Error(error.detail ? error.detail : error.message, {
				cause: error,
			});
		}
	}

	async delete(idToDelete) {
		const table = this.modelTableName;
		try {
			// check if table exists
			tableInterpolation(this.modelTableName);
			const id = parseInt(idToDelete, 10);

			const { rows } = await pool.query(
				`DELETE FROM ${table} WHERE id=($1) RETURNING *`,
				[id],
			);

			return rows[0] ?? null;
		} catch (error) {
			console.log(error);

			if (error.status) throw error;

			// 23503 = foreign_key_violation: the row is still referenced
			// (e.g. a brand used by an item) -> conflict, not a server error
			if (error.code === "23503") {
				const conflictError = new Error(
					`Suppression impossible : ${table} encore utilisé(e) par d'autres éléments`,
				);
				conflictError.status = 409;
				throw conflictError;
			}
			throw new Error(error.detail ? error.detail : error.message, {
				cause: error,
			});
		}
	}
}

module.exports = Generic;
