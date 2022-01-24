const pool = require('../database');

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
     * @param {number} id id the <tablename> we're looking for
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

    
}

module.exports = Generic;