import { Fragment, useState, useEffect, useRef} from "react";

import Header from './Header.js';
import EventDetails from './Components/EventDetails.js';
import SignIn from './Components/SignIn';
import { DateTime } from 'luxon';
import { FireSQL } from 'firesql';


import Constants from "./Constants";
import firebase from "firebase/app";

import { FirebaseDatabaseProvider } from "@react-firebase/database";



import "firebase/auth";

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import "firebase/firestore";



if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(Constants.firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();
const fireSQL = new FireSQL(db);

const verifiedClass = (type) => {
  let result = "";

  switch(type) {
    case 0:
      result = 'bg-gray-500'
      break;
    case 1:
      result = 'bg-green-500'   
      break;
    default:
      result = 'bg-blue-500'
  }
  return result;
}

export default function EventStream() {

  const transientName = useRef('');
  const [ username, setUsername ] = useState( '' );
  const [events, setEvents] = useState([]);

  fireSQL.query(`SELECT * FROM events`).then(documents => {
    console.log('hi???', documents);
    documents.forEach(doc => {
      console.log(doc);
      /* Do something with the document */
    });
  });

  const setObject = (doc, key, value) => {
    var obj = {}
    obj[key] = value;

    db.collection("events").doc(doc).update(obj).then(function() {
      console.log("updated obj");
    }).catch(err => alert('did not update', err));
  }

  const setVerified = (doc, value) => {
    setObject(doc, "verified", value);
  }

  const setEvent = (doc, key, value) => {
    var isRandom =  Math.random() > 0.3 ? 1 : 0;
    console.log(isRandom);
    setObject(doc, key, value)
    setObject(doc, "verified", 1)
    setObject(doc, "premium", isRandom);
    setObject(doc, "UpdatedAt", firebase.firestore.FieldValue.serverTimestamp())
  }


  var beginningDate = new Date();

  let start = new Date('2021-05-17 12:01');
  let end = new Date('2021-06-05 12:00');

  const fetchEvents = async (username) => {

    // try out sql -- maybe can get some better queries in
    // remove duplicates going forward
    // add a form


    let response = db.collection("events")
    .where("verified", "==", 3)
    .where('DateValue', ">=", start)
    .where('DateValue', "<", end)
    .orderBy('DateValue', "asc")
    .limit(50)
    
    // .where("PostHashHex", "==", "d4131256a0a06811cb8e5bf1b597769251c28640a5d292d22d3f53943079e23c")

    if (username) {
      response = db.collection("events").where("ProfileEntryResponse.Username", "==", username);
    }

    const data = await response.get();
    const results = data.docs.map((item) => item.data())

    setEvents(results);
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleBlur = () => {
    // This will only trigger if they blur AND the name has changed
    if (transientName.current !== username) {
        // Update the transient name value
        transientName.current = username;
        console.log('new username', username);

        fetchEvents(username);
    }
};

  return (
      <Fragment>

        <FirebaseAuthProvider {...Constants.firebaseConfig} firebase={firebase}>
        <Header 
          title="AI Generated Events"
          subtitle="From BitClout"
          description="Finding the best events on BitClout"
          unsplashId="photo-1614052699910-67c0f4b7384f"
        />

        <IfFirebaseAuthed>

        <br></br>
        <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" value={ username } onChange={ ( e ) => setUsername( e.target.value ) } onBlur={handleBlur} />

        {/* Calendar */}

        {events &&
          events.map((event, index) => {
            console.log(event);
            return (
              <div className="event-container">
                
                <div>{DateTime.fromMillis(event.DateValue.seconds * 1000).toFormat('yyyy-MMM-dd HH:mm Z')}
                
                <span class="ml-4 text-sm text-gray-400">POSTED {DateTime.fromISO(new Date(event.TimestampNanos / 1000000).toISOString()).toFormat('yyyy-MMM-dd HH:mm Z')}</span>
                <span class="text-sm ml-4">by: <a href={`https://www.bitclout.com/u/${event['ProfileEntryResponse']['Username']}`} target="_blank">{event['ProfileEntryResponse']['Username']} ${event['ProfileEntryResponse']['CoinPriceBitCloutNanos'] / 100000}</a>

                </span>
                </div>
                <p class="text-sm mt-2 mb-2">
                <button class={`${verifiedClass(event.verified)} hover:bg-blue-700 text-white font-bold py-1 px-1 rounded mr-4`} onClick={() => setVerified(event.PostHashHex, 1)}>
                  Yes Event
                </button> 

                <button class={`${verifiedClass(event.verified)} hover:bg-blue-700 text-white font-bold py-1 px-1 rounded mr-4 focus:ring focus:border-red-300`} tabindex="1000" onClick={() => setVerified(event.PostHashHex, 2)}>
                No Event
              </button> 

                  
                  <div class="w-1/2 p-8 font-semibold border m-2">
                  {event.Body}

                  </div>
                  </p>

                <div class="text-xs flex mt-2">
                  <div class="mr-2"><span class="font-semibold">Block:</span> {event.block}</div>
                  <div class="mr-2"><span class="font-semibold">Verified:</span> {JSON.stringify(event.verified)}</div>
                  <div class="mr-2"><span class="font-semibold">AllDay:</span> {JSON.stringify(event.DateAllDay)}</div>
                  <div class="mr-2"><span class="font-semibold">PostHexHash:</span> <a href={`https://www.bitclout.com/posts/${event.PostHashHex}`} target="_blank">{event.PostHashHex}</a></div>
                  <div class="mr-2"><span class="font-semibold">Added your event to the @bitcloutoffers calendar (bitcloutoffers.web.app) 🗓🙌 </span></div>
                  
                </div>

                <div class="flex mb-4 mt-4">
                  <p class="mr-2 font-bold w-32">Title:</p>
                  <input type="text" class="w-full" onBlur={(val) => {
                    const value = val.target.value;
                    setEvent(event.PostHashHex, "Title", value)
                    }} placeholder={event.Title || "Title"} />
                </div>

                <div class="flex">
                <p class="mr-2 font-bold w-32">Description:</p>
                  <textarea class="w-full" onBlur={(val) => {
                  const value = val.target.value;
                  setEvent(event.PostHashHex, "Description", value)
                  }} placeholder={event.Description || "Description"} />
                </div>


                <div class="flex">
                <p class="mr-2 font-bold w-32">Date</p>
                  <input type="date" onBlur={(val) => {
                  const value = val.target.value;
                  var date = new Date(value);
                  console.log("date value", date.toUTCString());
                  setEvent(event.PostHashHex, "DateValue", new Date(date.toUTCString()));
                  setEvent(event.PostHashHex, "DateAllDay", true)
                  }}></input>


                  <p class="ml-16 mr-2 font-bold w-32">Date Time</p>
                  <input type="datetime-local" onBlur={(val) => {
                  const value = val.target.value;
                  console.log("datetime value",  new Date(value));
                  setEvent(event.PostHashHex, "DateValue", new Date(value))
                  setEvent(event.PostHashHex, "DateAllDay", false)
                  }}></input>
                </div>

                <div class="flex">
                <p class="mr-2 font-bold w-32">All Day:</p>
                  <input type="checkbox" checked={event['DateAllDay']} onChange={(val) => {
                  const value = val.target.checked;

                  let newArr = [...events]; 
                  var newEvent = event;
                  newEvent['DateAllDay'] = value;
                  newArr[index] = newEvent; 

                  setEvent(event.PostHashHex, "DateAllDay", value)
                  setEvents(newArr); 
                  }} />
                </div>

                <div class="flex">
                <p class="mr-2 font-bold w-32">Premium?</p>
                  <input type="checkbox" checked={event['premium'] === 1} onChange={(val) => {
                  const checked = val.target.checked;
                  const value = checked ? 1 : 0;

                  let newArr = [...events]; 
                  var newEvent = event;
                  newEvent['premium'] = value
                  newArr[index] = newEvent; 

                  setEvent(event.PostHashHex, "premium", value)
                  setEvents(newArr); 
                  }} />
                </div>



                <div class="text-sm mt-4"><EventDetails props={event} /></div>
                <br/><br/>
              </div>  
              
            );
          })}
</IfFirebaseAuthed>
<SignIn />

</FirebaseAuthProvider>
      </Fragment>
  );
}



