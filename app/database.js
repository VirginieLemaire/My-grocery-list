//connection to DB with pooling
const {Pool} = require('pg');

let DB_URL;
if (process.env.NODE_ENV === 'test') {
    DB_URL = process.env.DATABASE_TEST_URL;
} else {
    DB_URL = process.env.DATABASE_URL;
}

const pool = new Pool({
    connectionString: DB_URL
});

if (process.env.NODE_ENV === 'production') {
    config.ssl = {
        rejectUnauthorized: false
    };
}


module.exports = pool;