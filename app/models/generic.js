const pool = require('../database');
// TODO : add schema to validate fields

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

    //get all <tableName>
    /**
     * Generic method to fetch all rows of a table in the database
     * @param {object} datas object containing model & table names
     * @returns {Array<model>} 
     * @async
     * @static
     */
     static async findAll(datas) {
        try {
            //console.log("ma table", datas.modelTableName);
            const {rows} = await pool.query(`SELECT * FROM ${datas.modelTableName}`);
            return rows.map(row => new datas.model(row));
        } catch (error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    //get one row of a table identified by its id
    /**
     * Generic method to fetch a single row from the database
     * @param {number} id id in the <tablename> we're looking for
     * @returns {<tablename> | null} null if no <tablename> matches the given id in database
     * @async
     * @static
     */
     static async findById(datas, id) {
        try {
            const {rows} = await pool.query(`SELECT * FROM ${datas.modelTableName} WHERE id=$1`, [id]);
            if (rows[0]) {
                return new datas.model(rows[0]);
            }
            return null;

        } catch(error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    // inserts a new row in a table
    /**
     * Generic method to save a new row in a table
     * @param {object} datas object containing model & table names
     * @param {object} body object containing the data to save
     * @returns {<tablename> | null} null if no <tablename> matches the given id in database
     * @async
     */
    async create() {
        try {
            const {rows} = await pool.query(`INSERT INTO ${this.modelTableName} (${Object.keys(this.body).join(", ")}) VALUES (${Object.keys(this.body).map((_, index) => `$${index + 1}`).join(", ")}) RETURNING id`, Object.values(this.body));

            if (rows[0]) {
                console.log(rows[0]);
                return rows[0];
            } else {
                throw new Error(`Can't record in table ${this.modelTableName}`);
            }
        } catch(error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    } 

    
}

module.exports = Generic;