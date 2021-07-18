const functions = require("firebase-functions");
const fetch = require("node-fetch");

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

exports.scheduledFunction = functions.pubsub.schedule('every 60 minutes').onRun((context) => {
    getAndSetExchangeRate();
});


