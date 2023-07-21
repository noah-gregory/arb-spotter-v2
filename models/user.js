const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({

FirstName: {
type: String,
required: true
},
LastName: {
    type: String,
    required: true
},
Email: {
type: String,
required: true
},
Login: {
type: String,
required: true
},
Password: {
type: String,
required: true
}
},  {
    versionKey: false // You should be aware of the outcome after set to false
});
module.exports = user = mongoose.model("users", UserSchema);

