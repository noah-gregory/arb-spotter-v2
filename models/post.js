const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    poster: {
        type: String
        // required: true
    },
    image: {
        type: String
        // required: true
    },
    caption: {
        type: String
        // required: true
    },
    tags: {
        type: [String]
        // required: true
    },
    dateCreated: {
        type: String
    }
},
{ timestamps: {
    createdAt: 'dateCreated'
} })
module.exports = mongoose.model("Post", postSchema, "posts")