const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({
    data: {
        type: Schema.Types.Mixed,
        required: true
    }
})
module.exports = mongoose.model("Date", dateSchema, "dates")