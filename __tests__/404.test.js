const request = require('supertest');
const app = require('../app/app');

describe('GET /api/:modelName with an unknown model name', () => {
    it('should return a 404 JSON error, not plain text', async() => {
        return await request(app)
            .get('/api/454cdcdcd')
            .expect('Content-Type', /json/)
            .expect(404)
            .then(response => {
                expect(response.body).toEqual({error: expect.any(String)});
            });
    });
});

describe('GET a route matching no route at all', () => {
    it('should return a 404 JSON error', async() => {
        return await request(app)
            .get('/api/a/b/c')
            .expect('Content-Type', /json/)
            .expect(404)
            .then(response => {
                expect(response.body).toEqual({error: expect.any(String)});
            });
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
