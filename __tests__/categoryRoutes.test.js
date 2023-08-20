const request = require('supertest');
const app = require('../app/app');

describe('GET /api/categories', () => {
    it('should return an array of categories', async() => {
        return await request(app)
            .get('/api/categories')
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

describe('GET /api/categories/1', () => {
    it('should return the category requested', async() => {
        return await request(app)
            .get('/api/categories/1')
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

describe('POST /api/categories', () => {
    it('should return the category created', async() => {
        return (
            await request(app)
            .post('/api/categories')
            .send({
                name: 'test'
            })
            /*.expect('Content-Type', /json/)*/
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

describe('PATCH /api/categories/1', () => {
    it('should return the category updated', async() => {
        return (
            await request(app)
            .patch('/api/categories/1')
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

