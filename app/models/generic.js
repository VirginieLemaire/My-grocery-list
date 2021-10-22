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

    //get all <model>
    /**
     * Fetches all <model> in the database
     * @returns {Array<model>} 
     * @async
     * @static
     */
     static async findAll(datas) {
        try {
            console.log("ma table", datas.modelTableName);
            const {rows} = await pool.query(`SELECT * FROM ${datas.modelTableName}`);
            return rows.map(row => new datas.model(row));
        } catch (error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

}

module.exports = Generic;