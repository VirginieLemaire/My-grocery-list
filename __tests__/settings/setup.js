const pool = require('../../app/database');
const { seedDatas } = require('../../data/services/seedAndClear');

beforeAll(async () => {
    await seedDatas();
});

afterAll(async () => {
    // await clearDatas();
    await pool.end();
});
