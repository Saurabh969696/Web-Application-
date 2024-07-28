const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

const saltRounds = 10;
let usersDb = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (usersDb[username]) {
        res.send('Username already exists. <a href="/register">Try again</a>');
    } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        usersDb[username] = hashedPassword;
        res.send('User registered successfully. <a href="/login">Login</a>');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = usersDb[username];
    if (!hashedPassword) {
        res.send('Username not found. <a href="/login">Try again</a>');
    } else {
        const match = await bcrypt.compare(password, hashedPassword);
        if (match) {
            res.send('Login successful. <a href="/">Home</a>');
        } else {
            res.send('Invalid password. <a href="/login">Try again</a>');
        }
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
