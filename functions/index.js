const functions = require("firebase-functions");
const fetch = require("node-fetch");
const cors = require('cors')({ origin: true });
require('dotenv').config()
const mongoose = require('mongoose');
const Event = require("./models/event");


// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const EXCHANGE_URL = "https://api.bitclout.com/get-exchange-rate";

const getAndSetExchangeRate = () => fetch(`${EXCHANGE_URL}`, {
    headers: {
      "content-type": "application/json",
    },
    method: "GET",
  }).then((res) => res.json())
  .then(x => {
      
    x["createdAt"] = admin.firestore.Timestamp.now();
    admin.firestore().collection('exchange_rate').doc().set(x);
}
      ).catch(err => console.log("latest error", err))

// exports.scheduledFunction = functions.pubsub.schedule('every day').onRun((context) => {
//     getAndSetExchangeRate();
// });

function getPost(postHashHex) {
  // http://localhost:5001/bitcloutoffers/us-central1/submitPostHash?postHash=submittedBy=
// get post
// build object
// push to mongo

  // const url = "http://bitclout.me/api/v0"; 
  const url = "https://bitclout.com/api/v0/get-single-post"; 

  return fetch(url, {
    headers: {
      "content-type": "application/json",
    },
    body: `{\"PostHashHex\":\"${postHashHex}\",\"FetchParents\":false,\"CommentOffset\":0,\"CommentLimit\":0,\"AddGlobalFeedBool\":false}`,
    method: "POST",
  }).then((res) => res.json())
}

function createObject(post, details, createdBy) {
  const obj = {
    title: "",
    description: "",
    currentBlock: post["ConfirmationBlockHeight"],
    startTime: new Date(),
    precision: "start_date",
    endTime: null,
    createdBy: createdBy || "",
    username: post["ProfileEntryResponse"]["Username"].toLowerCase(),
    post: {data: post},
    date: {data: {}},
    createdDetails: details || "",
    verified: 3,
    block: post["ConfirmationBlockHeight"],
    location: "",
    timeZone: ""
  }

  return obj
}

async function postDb(obj) {
  // STRING Interface "mongodb+srv://username:<password>@<cluster>/<database>?retryWrites=true&w=majority";
  const connection = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.c41sv.mongodb.net/bitcloutoffers?retryWrites=true&w=majority`;
  mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

    const events = new Event(obj);
    
    return await events.save().then(() => {
      console.log("saved?");
    }).catch(err => console.log('err??', err))
}

exports.submitPostHash = functions.https.onRequest(async (req, res) => {
  cors(req, res, async (err) => {
    if (err) {
      // Denied by CORS/error with CORS configuration
      console.error("CORS blocked request -> ", err);
      res.status(403).send("Forbidden by CORS");
      return;
    }

  try {
    var postHash = req.body.postHash || "null";
    var details = req.body.details || "null";
    var createdBy = req.body.userId || "null";

    var post = await getPost(postHash);

    var object = createObject(post["PostFound"], details, createdBy);

    await postDb(object);
    res.json({ complete: true})
  } catch (error) {
    console.log("error??? errror", error);
    res.status(500).send("Something broke!");
  }
  return;

  // const data = { 
  //   createdAt: admin.firestore.Timestamp.now(),
  //   postHash: req.body.postHash || "null",
  //   submittedBy: req.body.userId || "null",
  //   details: req.body.details || "null",
  //   state: "REQUESTED" // REQUESTED, ADDED, REJECTED
  // }

  // console.log(data);
  // admin.firestore().collection('postHash').doc().set(data);

  // firebase endpoint, checks JWT, if user, can submit post id
// test functions
// deploy functions
  })
});

