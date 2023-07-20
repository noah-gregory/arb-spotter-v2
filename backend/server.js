const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;
app.set('port', (process.env.PORT || 5000));
const app = express();
require('./database');

console.log(port);

app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');
require('dotenv').config();
const connection = process.env.MONGODB_URI;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
api.setApp( app, mongoose );
// API
const users = require('./api/users');
app.use('./api/users', users);

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