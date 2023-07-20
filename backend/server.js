const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
require('./database');

app.use(bodyParser.json());
app.use(cors());

// API
const users = require('./api/users');
app.use('./api/users', users);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
    app.get('/', function (req, res) {
        res.render('index', {});
    });
}


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});