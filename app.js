const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'sehrgeheim',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const bcrypt = require('bcrypt');

const users = [
    { id: 1, username: 'user1', password: bcrypt.hashSync('Dscole1905', 10) } 
];


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.id;
        res.status(200).send('Login erfolgreich');
    } else {
        res.status(401).send('Authentifizierung fehlgeschlagen');
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('Logout erfolgreich');
});

module.exports = app;
