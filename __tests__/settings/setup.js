const pool = require('../../app/database');
const { clearDatas, seedDatas } = require('../../data/services/seedAndClear');

beforeAll((done) => {
    // console.log("beforeAll");
    seedDatas();
    done();
});

afterAll((done) => {
    // console.log("afterAll");
    // clearDatas();
    pool.end();
    done();
});