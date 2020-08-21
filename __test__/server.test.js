'use strict';

const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);


describe('web server', () => {
    it('should respond with a 500 on an error', () => {
        return mockRequest
            .get('/bad')
            .then(results => {
                expect(results.status).toBe(500);
            })
    });
    
    it('should respons with a 404 on an invalid route', () => {
        return mockRequest
            .get('/crab')
            .then(results => {
                expect(results.status).toBe(404);
            })
    });

    it('should respons with a 404 on an invalid method', () => {
        return mockRequest
            .post('/')
            .then(results => {
                expect(results.status).toBe(404);
            })
    });

    it('should respond properly on request to /products', () => {
        return mockRequest
            .get('/product')
            .then(results => {
                expect(results.status).toBe(200);
            })
    });


});

// need to insert more tests







