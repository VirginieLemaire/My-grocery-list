//connection to DB with pooling

const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

if (process.env.NODE_ENV === 'production') {
    config.ssl = {
        rejectUnauthorized: false
    };
}


module.exports = pool;