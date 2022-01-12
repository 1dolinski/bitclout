const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const metaSchema = new Schema({
    currentBlock: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model("Meta", metaSchema, "metas")