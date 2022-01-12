const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    data: {
        type: Schema.Types.Mixed,
        required: true
    }
})
module.exports = mongoose.model("Profile", profileSchema, "profiles")