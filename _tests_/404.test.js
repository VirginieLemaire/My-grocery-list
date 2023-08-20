const request = require('supertest');
const app = require('../app/app');

describe('GET lost', () => {
    it('should return a 404 code', async() => {
        return await request(app)
            .get('/api/454cdcdcd')
            .expect(404);
    });
});

describe('GET a real endpoint should not send a 404 status', () => {
    it('should not return a 404 code', async() => {
        return await request(app)
            .get('/api/items')
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.status).not.toBe(404);
            });
    });
});