import { Fragment, useState, useEffect, useRef} from "react";

import Header from './Header.js';
import EventDetails from './Components/EventDetails.js';
import SignIn from './Components/SignIn';
import { DateTime } from 'luxon';
import api from "./api.js";
import precision from "./precision";

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
import dateFormatter from "./dateFormatter.js";


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

  const setObject = async (id, key, value) => {
    var obj = {}
    obj[key] = value;

    var data = {};
    data["_id"] = id;
    data[key] = value;

    try {
      await api.updateEvent(data);
    } catch (err) {
      console.log("did not update", id, key, value, err);
    }

    // db.collection("events").doc(doc).update(obj).then(function() {
    //   console.log("updated obj");
    // }).catch(err => alert('did not update', err));
  }

  const setVerified = (id, value) => {
    setObject(id, "verified", value);
  }

  const setEvent = (id, key, value) => {
    var isRandom =  Math.random() > 0.3;

    setObject(id, key, value)
    setObject(id, "verified", 1)
    setObject(id, "premium", isRandom);
    setObject(id, "updatedAt", new Date())
  }

  var beginningDate = new Date();

  let start = new Date('2021-05-17 12:01');
  let end = new Date('2021-06-05 12:00');

  const fetchEvents = async (username) => {
    console.log('getting events?');
    // const results = await api.getEvents(`verified=3&post.data.ProfileEntryResponse.CoinPriceBitCloutNanos=>1441000000&startTime=>${new Date()}&startTime=<${new Date(new Date().setFullYear(new Date().getFullYear() + 1))}`);
    const results = await api.getEvents(`verified=3&post.data.ProfileEntryResponse.CoinPriceBitCloutNanos=>1041000000&startTime=>${new Date()}&startTime=<${new Date(new Date().setFullYear(new Date().getFullYear() + 1))}`);
    // const results = await api.getEvents("type=ongoing");
    console.log('seting events', results);
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

        <div class="mt-8 mb-8"><span class="font-semibold">Added your event to the @bitcloutoffers calendar (bitcloutoffers.web.app) 🗓🙌 </span></div>


        <div class="o verflow-y-scroll h -80">

        {events &&
          events.map((event, index) => {
            return (

              <div className="event-container">
                
                <div>{DateTime.fromJSDate(new Date(event.startTime)).toFormat('yyyy-MMM-dd HH:mm Z')}

                
                <span class="ml-4 text-sm text-gray-400">POSTED {DateTime.fromISO(new Date(event.post.data.TimestampNanos / 1000000).toISOString()).toFormat('yyyy-MMM-dd HH:mm Z')}</span>
                <span class="text-sm ml-4">by: <a href={`https://www.bitclout.com/u/${event.post.data['ProfileEntryResponse']['Username']}`} target="_blank">{event.post.data['ProfileEntryResponse']['Username']} ${event.post.data['ProfileEntryResponse']['CoinPriceBitCloutNanos'] / 100000}</a>

                </span>
                </div>
                
                <p class="text-sm mt-2 mb-2">
                <button class={`${verifiedClass(event.verified)} hover:bg-blue-700 text-white font-bold py-1 px-1 rounded mr-4`} onClick={() => setVerified(event._id, true)}>
                  Yes Event
                </button> 

                <button class={`${verifiedClass(event.verified)} hover:bg-blue-700 text-white font-bold py-1 px-1 rounded mr-4 focus:ring focus:border-red-300`} tabindex="1000" onClick={() => setVerified(event._id, false)}>
                No Event
              </button> 

                
                  <div class="w-1/2 p-8 font-semibold border m-2">
                  {event.post.data.Body}

                  </div>
                  </p>
               
                <div class="text-xs flex mt-2">
                  <div class="mr-2"><span class="font-semibold">Block:</span> {event.block}</div>
                  <div class="mr-2"><span class="font-semibold">Verified:</span> {JSON.stringify(event.verified)}</div>
                  <div class="mr-2"><span class="font-semibold">AllDay:</span> {JSON.stringify(event.DateAllDay)}</div>
                  <div class="mr-2"><span class="font-semibold">PostHexHash:</span> <a href={`https://www.bitclout.com/posts/${event.post.data.PostHashHex}`} target="_blank">{event.post.data.PostHashHex}</a></div>
                  <div class="mr-2"><span class="font-semibold">ObjectId:</span> {event._id}</div>
                  
                  
                </div>
                <div>id: </div>

                

                <div class="flex mb-4 mt-4">
                  <p class="mr-2 font-bold w-32">Title: </p>
                  <input type="text" class="w-full border p-1 rounded" onBlur={(val) => {
                    const value = val.target.value;
                    setEvent(event._id, "title", value) 
                    }} placeholder={event.title || "Title"} />
                </div>

                

                <div class="flex">
                <p class="mr-2 font-bold w-32">Description:</p>
                  <textarea class="w-full border p-1 rounded" onBlur={(val) => {
                  const value = val.target.value;
                  setEvent(event._id, "description", value)
                  }} placeholder={event.description || "Description"} />
                </div>



                <div class="flex">
                <p class="mr-2 font-bold w-32">Start Time</p>
                  <input type="date" onBlur={(val) => {
                  const value = val.target.value;
                  var date = new Date(value);
                  setEvent(event._id, "startTime", dateFormatter.setEST(date));
                  }}></input>


                  <p class="ml-16 mr-2 font-bold w-32">Start Date Time</p>
                  <input type="datetime-local" onBlur={(val) => {
                  const value = val.target.value;
                  var date = new Date(value);
                  setEvent(event._id, "startTime", dateFormatter.setEST(date))
                  }}></input>
                </div>

                <div class="flex">
                <p class="mr-2 font-bold w-32">End Time</p>
                  <input type="date" onBlur={(val) => {
                  const value = val.target.value;
                  var date = new Date(value);
                  setEvent(event._id, "endTime", dateFormatter.setEST(date));
                  }}></input>


                  <p class="ml-16 mr-2 font-bold w-32">End Date Time</p>
                  <input type="datetime-local" onBlur={(val) => {
                  const value = val.target.value;
                  var date = new Date(value);
                  setEvent(event._id, "endTime", dateFormatter.setEST(date))
                  }}></input>
                </div>

                <div class="flex">
                <p class="mr-2 font-bold w-32">Precision</p>
                <select name="precision" id="precision" onBlur={(val) => {
                  const value = val.target.value;
                  console.log("precision value", value);
                  setEvent(event._id, "precision", value)
                  }}>
                  <option value={null}></option>
                  {
                    precision.list.map(precision => {
                      return (<option value={`${precision}`}>{precision}</option>)
                    })
                  }
                </select>
                </div>
                
                <div class="flex mb-4 mt-4">
                  <p class="mr-2 font-bold w-32">Tags: </p>
                  <input type="text" class="w-full border p-1 rounded" onBlur={(val) => {
                    const value = val.target.value;
                    console.log("tags", value.split(","));
                    setEvent(event._id, "tags", value.split(",")) 
                    }} placeholder={event.tags.join(",") || ""} />
                </div>

                <div class="flex mb-4 mt-4">
                  <p class="mr-2 font-bold w-32">Users: </p>
                  <input type="text" class="w-full border p-1 rounded" onBlur={(val) => {
                    const value = val.target.value;
                    setEvent(event._id, "users", value.split(",")) 
                    }} placeholder={event.users.join(",") || ""} />
                </div>

                <div class="flex">
                <p class="mr-2 font-bold w-32">Premium?</p>
                  <input type="checkbox" checked={event.premium} onChange={(val) => {
                  const checked = val.target.checked;
                  const value = checked ? 1 : 0;

                  let newArr = [...events]; 
                  var newEvent = event;
                  newEvent['premium'] = value
                  newArr[index] = newEvent; 

                  setEvent(event._id, "premium", value)
                  setEvents(newArr); 
                  }} />
                </div>



                <div class="text-sm mt-4"><EventDetails props={event} /></div>
                <br/><br/> 
              </div>  
              
            );
          })}
          </div>
</IfFirebaseAuthed>
<SignIn />

</FirebaseAuthProvider>
      </Fragment>
  );
}



