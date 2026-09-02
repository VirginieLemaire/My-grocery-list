require('@dotenvx/dotenvx').config({logLevel: 'error', ignore: ['MISSING_ENV_FILE']});
const { exec } = require('node:child_process');
const { promisify } = require('node:util');

const execAsync = promisify(exec);

/**
 * connect to DB and execute script to clear datas from all tables
 * @returns {Promise<void>}
 */
exports.clearDatas = () => execAsync(`psql ${process.env.DATABASE_TEST_URL} -f ./data/clear_datas.sql`);

/**
 * connect to DB and execute script to seed datas
 * @returns {Promise<void>}
 */
exports.seedDatas = () => execAsync(`psql ${process.env.DATABASE_TEST_URL} -f ./data/seed_dispo.sql`);
