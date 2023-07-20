const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();
// require('./database');
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');

require('dotenv').config();
const url = process.env.MONGODB_URI;
console.log(url);
mongoose.connect(url)
.then(() => console.log("Mongo DB connected"))
.catch(err => console.log(err));


// API
var api = require('./api.js');
api.setApp( app, mongoose );
// const users = require('./api/users');
// app.use('./api/users', users);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('../build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    });
    app.get('/', function (req, res) {
        res.render('index', {});
    });
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});