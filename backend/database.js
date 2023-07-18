const mongoose = require('mongoose');
const connection = "mongodb+srv://user1-cop4331:letsG0gamers@arboretumspotterdb.gkhtua6.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));