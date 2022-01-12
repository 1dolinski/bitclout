const mongoose = require('mongoose');

const dateSchema = require('./date').model('Date').schema;
const postSchema = require('./post').model('Date').schema;
const profileSchema = require('./profile').model('Date').schema;

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    startTime: {
        type: Date,
        required: false
    },
    endTime: {
        type: Date,
        required: false
    },
    precision: {
        type: String,
        required: false
    },
    timezone: {
        type: String,
        required: false
    },
    position: {
        type: Number,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    createdBy: {
        type: String,
        required: false
    },
    createdDetails: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
    tags: {
        type: Array,
        required: false
    },
    users: {
        type: Array,
        required: false
    },
    verified: { // see if user has verified it 1 it's an evnet, 2 it's not an event, 3 it's a post waiting to be verified
        type: Number,
        required: true
    },
    premium: {
        type: Boolean,
        required: false
    },
    date: {
        type: dateSchema,
        required: false
    },
    post: {
        type: postSchema,
        required: false
    },
    block: {
        type: Number,
        required: false
    }
})
module.exports = mongoose.model("Event", eventSchema, "events")



// Query Nested Object
    // speed of querying nested objects

// createdBy: bitcloutoffers
// type: userCreated, aiGenerated
// postData: object
// dateParserData: object
// profileData: object

// see if I can query by these nested





// const obj = {
//     block: currentBlock,
//     PostHashHex: post["PostHashHex"],
//     ParentStakeID: post["ParentStakeID"],
//     Body: post["Body"],
//     ImageUrls: post["ImageUrls"] || [],
//     TimestampNanos: post["TimestampNanos"],
//     IsHidden: post["IsHidden"],
//     DateParser: ducklingResponse,
//     // DateValue: new Date(accurateWit.date),
//     DucklingUrls: accurateWit.urls,
//     ProfileEntryResponse: {
//       PublicKeyBase58Check:
//         post["ProfileEntryResponse"]["PublicKeyBase58Check"],
//     //   Username: post["ProfileEntryResponse"]["Username"],
//     //   CoinPriceBitCloutNanos: post["ProfileEntryResponse"]["CoinPriceBitCloutNanos"],
//     //   ProfilePic: post["ProfileEntryResponse"]["ProfilePic"],
//       IsHidden: post["ProfileEntryResponse"]["IsHidden"],
//       IsReserved: post["ProfileEntryResponse"]["IsReserved"],
//       IsVerified: post["ProfileEntryResponse"]["IsVerified"],
//     //   Posts: post["ProfileEntryResponse"]["Posts"],
//     },
//     verified: 3
//   };


//   // clout.chat