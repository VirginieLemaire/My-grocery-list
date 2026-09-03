const pool = require('../../app/database');
const { seedDatas, clearDatas } = require('../../data/services/seedAndClear');

beforeAll(async () => {
    await seedDatas();
});

afterAll(async () => {
    await clearDatas();
    await pool.end();
});
