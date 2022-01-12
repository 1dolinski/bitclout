const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    data: {
        type: Schema.Types.Mixed,
        required: true
    }
})
module.exports = mongoose.model("Post", postSchema, "posts")