import Modal from "./Components/Modal";

import { Fragment, useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import EventRow from "./Components/EventRow.js";
import Constants from "./Constants";
import firebase from "firebase/app";
import "firebase/firestore";
import { DateTime } from "luxon";
import PremiumCode from "./Components/PremiumCode";
import Sponsors from "./Components/Sponsors";
import Login from "./Components/Login";
import EventSection from "./Components/EventSection";
import Header from "./Header.js";
import { get, useForm } from "react-hook-form";
import api from "./api.js";

const fetch = require("node-fetch");

if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(Constants.firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const hasPremiumAccess = () =>
  localStorage.getItem("bitcloutoffersPremiumCalendar") === "DiamondCalendar";

const db = firebase.firestore();
{
  /* */
}
function renderEventContent(info) {
  var isPremium = info.event.extendedProps.premium === 1;

  var date = DateTime.fromSeconds(info.event.extendedProps.DateValue.seconds)
    .toLocaleString(DateTime.TIME_SIMPLE)
    .replace(" ", "")
    .replace(":00", "")
    .toLowerCase();

  if (info.event.extendedProps.DateAllDay) {
    date = undefined;
  }

  if (isPremium) {
    return (
      <div class="overflow-x-hidden">
        <div class="text-xs">
          💎 {date}{" "}
          <b>
            {hasPremiumAccess()
              ? info.event.extendedProps.Title
              : "**Requires Diamond Passcode"}
          </b>
        </div>
      </div>
    );
  } else {
    return (
      <div class="overflow-x-hidden">
        <div class="text-xs">
          {date} <b>{info.event.extendedProps.Title}</b>
        </div>
      </div>
    );
  }
}

export default function Home() {
  const [modal, setModal] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(false);
  const [event, setEvent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("embedclout", "bitcloutoffers");
    script.setAttribute("template", "light");
    script.setAttribute("position", "default");
    script.setAttribute("size", "detailed");
    script.src = "https://www.embedclout.com/badge/badge.js";

    document.querySelector("#embed").appendChild(script);
  }, []);

  const fetchToday = async () => {
    // let start = new Date("2021-05-16 12:01");
    // let end = new Date("2021-05-19 12:00");

    let start = DateTime.now().startOf('day').toJSDate();
    let end = DateTime.now().endOf('day').plus({days: 2}).toJSDate();

    let response = db
      .collection("events")
      .where("verified", "==", 1)
      .where("DateValue", ">=", start)
      .where("DateValue", "<", end)
      .limit(100);

    
    const data = await response.get();
    const results = data.docs.map((item) => item.data());

    console.log("hi", results[0].DateValue.toDate());

    // setToday(results);
    setIsLoading(false);
  };

  const fetchExchangeRate = async () => {
    console.log("getting exchange rate");
    const rate = await api.getExchangeRate;
    setExchangeRate(rate)
  }

  useEffect(async () => {
    fetchExchangeRate();
    // fetchToday();

    // fetchTomorrow();
  }, []);

  return (
    <Fragment>
      <Modal open={modal} close={() => setModal(false)} event={event}/>

      <Header
        title="Jump Into Your Next"
        subtitle="BitClout Event"
        description="Jamclouts, NFT Giveaways, Discord conversations. Our AI algorithm searches the blockchain posts and turns them into events."
        unsplashId="photo-1616635460792-0c6ff749d56a"
      />


    {/* queryString={`type=ongoing&users[]=1dolinski&users[]=jakeudell&startTime=>${encodeURI(new Date())}`} */}
{/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"> */}

<div class="mt-16">
          <Login />
        </div>

    <div class="grid sm:grid-cols-1 lg:grid-cols-2 mt-16 gap-4">
      <div class="">
        <EventSection 
          title="Ongoing"
          type="ongoing"
          queryString={`type=ongoing`}
          setEvent={(event) => {
            setEvent(event)
            setModal(true)
          }}
          exchangeRate={exchangeRate}
          />
          </div>
          <div>

      <EventSection 
            title="Upcoming"
            type="upcoming"
            queryString={`type=upcoming`}
            setEvent={(event) => {
              setEvent(event)
              setModal(true)
            }}
            exchangeRate={exchangeRate}
            />
            </div>
    </div>
{/* </div> */}

  <div class="grid grid-cols-12 gap-1 mt-24">
        <div class="col-span-12">
        <EventSection 
          title="Ended"
          type="ended"
          queryString={`type=ended`}
          setEvent={(event) => {
            setEvent(event)
            setModal(true)
          }}
          exchangeRate={exchangeRate}
        />
    </div>
  </div>

<div className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Do You Have an Offer or Event?</span>
            <span className="block text-indigo-600">Add it to the List</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="https://bitcloutoffers.com/events/new"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add Offer or Event
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between">
        {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          🎟 Upcoming BitClout Events
        </h2> */}



        {/* {isLoading && <p>Wait I'm loading events for you</p>} */}

          {/* {today.map((c, index) => (
            <div key={index}>
              {
                <>
                    <EventRow
                      premium={c.premium == 1}
                      allDay={c.DateAllDay}
                      dateValue={DateTime.fromJSDate(
                        c.DateValue.toDate()
                      ).toSeconds()}
                      timeZone={"America/New_York"}
                      url={`https://www.bitclout.com/posts/${c.PostHashHex}`}
                      title={c.Title}
                      createdAt={DateTime.fromJSDate(
                        c.UpdatedAt.toDate()
                      ).toSeconds()}
                      profilePic={c.ProfileEntryResponse.ProfilePic}
                      username={c.ProfileEntryResponse.Username}
                    />
                </>
              }
            </div>
          ))} */}

        <div className="mt-8">
          <a className="text-xl flex" href="/calendar">
            <p class="underline">More events - see the full calendar</p>
            <ArrowRightIcon className="h-6 w-6 mt-1" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">🐋 Creator Offers</h2>
    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 mb-2">
        The Most Promoted Offers on BitClout
    </p>

    {isLoading && <p>Wait I'm loading offers for you</p>}

    {offers.map((c, index) => (
        <div key={index}>
          { (
            <>
                <Row record={c} />
            </>
          )}
        </div>
      ))}

    <div className="mt-8">
        <a className="text-xl flex" href="/list">
            <p>See all offers</p>
            <ArrowRightIcon className="h-6 w-6 mt-1" aria-hidden="true"/></a>
    </div>
    </div> */}



      {/* <Sponsors /> */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-left">
        <div id="embed"></div>
      </div>
    </Fragment>
  );
}
