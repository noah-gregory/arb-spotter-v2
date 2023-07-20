const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    poster: {
        type: String,
        required: true
    },
    xCoord: {
        type: String,
        required: true
    },
    yCoord: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model("Post", postSchema, "posts")