const request = require('supertest');
const app = require('../app/app');

describe('GET /api/shelves', () => {
    it('should return an array of shelves', async() => {
        return await request(app)
            .get('/api/shelves')
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

describe('GET /api/shelves/1', () => {
    it('should return the shelf requested', async() => {
        return await request(app)
            .get('/api/shelves/1')
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

// describe('POST /api/shelves', () => {
//     it('should return the shelf created', async() => {
//         return (
//             await request(app)
//             .post('/api/shelves')
//             .send({
//                 name: 'test'
//             })
//             .expect('Content-Type', /json/)
//             .expect(201)
//             .then(response => {
//                 expect(response.body).toEqual(
//                     expect.objectContaining({
//                         id: expect.any(Number),
//                         name: expect.any(String),
//                     }),
//                 );
//             })
//         );
//     });
// });
