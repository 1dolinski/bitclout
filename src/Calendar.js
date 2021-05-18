import { React, Fragment, useState, useEffect, useCallback} from "react";

import Header from "./Header.js";
import Modal from "./Components/Modal";
import Constants from "./Constants";
import firebase from "firebase/app";
import "firebase/firestore";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { DateTime } from 'luxon';
import PremiumCode from './Components/PremiumCode';

if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(Constants.firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();
{/* */}
function renderEventContent(info) {

  const hasPremiumAccess = () => localStorage.getItem('bitcloutoffersPremiumCalendar') === "DiamondCalendar";

  var isPremium = info.event.extendedProps.premium === 1;


  var date = DateTime.fromSeconds(info.event.extendedProps.DateValue.seconds).toLocaleString(DateTime.TIME_SIMPLE).replace(" ", "").replace(":00", "").toLowerCase()

  if (info.event.extendedProps.DateAllDay) {
    date = undefined;
  }

    if (isPremium) {
      return (
      <div class="overflow-x-hidden">
      <div class="text-xs">💎 {date} <b>{ (hasPremiumAccess()) ? info.event.extendedProps.Title : "**Requires Diamond Passcode"}</b></div> 
      </div>
      )
    } else {
      return (
      <div class="overflow-x-hidden">
      <div class="text-xs">{date} <b>{info.event.extendedProps.Title}</b></div> 
      </div>
      )
    }
}

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState();

  window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('embedclout', 'nachoaverage')
    script.setAttribute('template', 'light')
    script.setAttribute('position', 'default')
    script.setAttribute('size', 'detailed')
    script.src = 'https://www.embedclout.com/badge/badge.js'
  
    document.querySelector('#embed').appendChild(script);
  }, [])

  const fetchEvents = async (username) => {
    let response = db
      .collection("events")
      .where("verified", "==", 1)
      // .where('DateValue', ">=", beginningDate)
      .orderBy("DateValue")
      .limit(1000);

    const data = await response.get();
    const results = data.docs.map((item) => item.data());
    
    setEvents(results);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  function dateClick(info) {
    // console.log("info", info);
    // console.log(info.event);
    // console.log(info.event.title);
    // console.log(info.event.extendedProps.Body);

    const hasPremiumAccess = localStorage.getItem('bitcloutoffersPremiumCalendar') === "DiamondCalendar";

    if (hasPremiumAccess || info.event.extendedProps.premium != 1) {
      setModal(true);
      setEvent(info.event.extendedProps);
    }

    if (info.event.extendedProps.premium === 1 && !hasPremiumAccess) {
      alert("Enter premium access code for 💎 event details");
    }
  }

  return (
    <Fragment>
      <Modal open={modal} close={() => setModal(false)} event={event}/>
      <Header
        title="The Bitclout Calendar"
        subtitle="It's Easy to Get Involved"
        description="Using AI to discover BitClout posts and turn them into events. Verified by @BitcloutOffers - updated to latest Bitclout Tip"
        unsplashId="photo-1614052699910-67c0f4b7384f"
      />

      <div className="bg-blue-50 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-blue-900 sm:text-4xl">
          <span className="block">NachoAverage 24/7 Stream</span>
          <span className="block text-indigo-600">The longest running Bitclout Stream</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <div id="embed"></div>
          </div>
        </div>
      </div>
    </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between">

      <div>
        <PremiumCode />
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridWeek dayGridMonth listWeek",
        }}
        initialView={window.mobilecheck() ? "listWeek" : "dayGridWeek"}
        weekends={true}
        events={events.map((event) => {
          var date = event.DateAllDay ? DateTime.fromJSDate(event.DateValue.toDate()).toUTC().toFormat("yyyy-MM-dd") : event.DateValue.toDate();
          
          return {
            title: event.Body,
            date: date,
            allDay: event.DateAllDay,
            extendedProps: event,
          };
        })}
        eventContent={renderEventContent}
        eventClick={(event) => dateClick(event)}
      />
      </div>
      {/* <iframe className="airtable-embed" src="https://airtable.com/embed/shrTx4wwPPXBdGqgn?backgroundColor=cyan&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style={{"background": "transparent", "border": "1px solid #ccc"}}></iframe> */}


    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Do You Have an Event?</span>
          <span className="block text-indigo-600">Add it to the Calendar</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="https://www.bitclout.com/u/bitcloutoffers" target="_blank"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add Your Event - Post on Bitclout With a Date
            </a>
              
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

// on Click -> open model -> show post, background close modal
// show information
// see how it's displayed on mobile

// nicer dates -> open modal on calendar, open modal on list

// add stream input updates -> title, date

// filtering by type, username
// hire someone to do the work, pay them with bitclout
