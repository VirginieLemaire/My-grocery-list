const request = require('supertest');
const app = require('../app/app');

describe('GET /api/brands', () => {
    it('should return an array of brands', async() => {
        return await request(app)
            .get('/api/brands')
            .set('Accept', 'application/json')
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

describe('GET /api/brands/1', () => {
    it('should return the brand requested', async() => {
        return await request(app)
            .get('/api/brands/1')
/*             .set('Accept', 'application/json')
            .expect('Content-Type', /json/) */
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

describe('POST /api/brands', () => {
    it('should return the brand created', async() => {
        return (
            await request(app)
            .post('/api/brands')
            .send({
                name: 'test'
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                    }),
                );
            })
        );
    });
});

describe('PATCH /api/brands/1', () => {
    it('should return the brand updated', async() => {
        return (
            await request(app)
            .patch('/api/brands/1')
            .send({
                name: 'modified test'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        update_table_dynamic: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                        }),
                    }),
                );
            })
        );
    });
});
