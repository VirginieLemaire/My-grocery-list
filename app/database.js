//connexion à la BDD en pool

const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
//pour passer en production
if (process.env.NODE_ENV === 'production') {
    config.ssl = {
        rejectUnauthorized: false
    };
}


module.exports = pool;