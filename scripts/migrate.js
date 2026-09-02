// Applies the SQL migrations in migrations/deploy, in order, against the
// database targeted by app/database.js (DATABASE_URL, or DATABASE_TEST_URL
// when NODE_ENV=test).
const fs = require('node:fs');
const path = require('node:path');
const pool = require('../app/database');

const DEPLOY_DIR = path.join(__dirname, '..', 'migrations', 'deploy');

// order matters: each file can depend on tables/functions created by the previous one
const MIGRATION_FILES = [
    'init.sql',
    'genericUpdatingFunction.sql',
    'view.sql',
];

async function migrate() {
    for (const file of MIGRATION_FILES) {
        const filePath = path.join(DEPLOY_DIR, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        console.log(`Applying ${file}...`);
        await pool.query(sql);
    }
    console.log('Migrations applied.');
}

migrate()
    .catch((error) => {
        console.error('Migration failed:', error);
        process.exitCode = 1;
    })
    .finally(() => pool.end());
