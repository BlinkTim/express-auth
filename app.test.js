const request = require('supertest');
const app = require('./app');

describe('Authentifizierungstests', () => {
    test('Erfolgreiches Login', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'user1', password: 'passwort123' });
        expect(response.statusCode).toBe(200);
    });

    test('Fehlgeschlagenes Login', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'user1', password: 'falschesPasswort' });
        expect(response.statusCode).toBe(401);
    });
});
