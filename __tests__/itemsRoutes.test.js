const request = require('supertest');
const app = require('../app/app');


describe('GET /api/items', () => {
    it('should return an array of items', async() => {
        return await request(app)
            .get('/api/items')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                        }),
                    ]),
                );
            });
    });
});

describe('GET /api/items/filter?shelf=frais', () => {
    it('should return an array of items for the shelf "frais"', async() => {
        return await request(app)
            .get('/api/items/filter?shelf=frais')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            shelf: expect.stringMatching('Frais')
                        })
                    ]),
                );
            });
    });
});

describe('GET /api/items/1', () => {
    it('should return the item requested', async() => {
        return await request(app)
            .get('/api/items/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                    }),
                );
            });
    });
});

describe('POST /api/items', () => {
    it('should return the item created', async() => {
        return (
            await request(app)
            .post('/api/items')
            .send({
                name: 'test',
                details: 'test too',
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        details: expect.any(String)
                    }),
                );
            })
        );
    });
});
