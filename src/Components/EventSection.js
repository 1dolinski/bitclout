import { Fragment, useState, useEffect } from "react";
import api from "../api.js";
import dateFormatter from "../dateFormatter";
import Tag from "./Tag.js";
import { DateTime } from "luxon";
import { CalendarIcon } from '@heroicons/react/outline'

const endedHeaders = () => (
  <Fragment>
    <th class="w-2/6 text-left">Title</th>
    <th class="w-1/6 text-right">Start Time</th>
    <th class="w-1/6 text-right">End Time</th>
    <th class="w-1/6 text-right">Details</th>
  </Fragment>
);

const headers = (opts = {}) => (
  <Fragment>
    <th class="w-2/6 text-left">Title</th>
    <th class="w-1/6 text-right">{opts.time || "Start Time"}</th>
    <th class="w-1/6 text-right">Details</th>
  </Fragment>
);

const addToGCal = (event) => {

  const baseUrl = 'http://www.google.com/calendar/event';
  const url = new URL(baseUrl);
  url.searchParams.set('action', "TEMPLATE");
  url.searchParams.set('dates', `${new Date(event.startTime).toISOString().replace(/\-|\.|\:/g, "")}/${new Date(event.startTime).toISOString().replace(/\-|\.|\:/g, "")}`);
  url.searchParams.set('details', event.description);
  url.searchParams.set('text', event.title);

  // 20210607T170000Z
  // 20220126T180000Z

  console.log(url, event);
  // http://www.google.com/calendar/event?action=TEMPLATE&dates=20220422%2F20220423&details=This+event+has+been+added+from+usehappen.com+-+Apr+22%2C+2022&location=&text=The+Batman+-+DC+FanDome+Teaser+-+YouTube

  return <a target="_blank" href={url}>
    +🗓
  </a>
}

function endedRows(event) {}

export default function EventSection(props) {
  const [data, setData] = useState([]);
  const { queryString, title, type, setEvent, exchangeRate } = props;

  const dateLabel = (date, precision, timeZone) => {
    // fill this in
  };

  const calculatedCoinPrice = (CoinPriceBitCloutNanos) => {
    if (!exchangeRate["SatoshisPerBitCloutExchangeRate"]) {
      return;
    }

    console.log(
      exchangeRate["SatoshisPerBitCloutExchangeRate"],
      exchangeRate["USDCentsPerBitcoinExchangeRate"],
      CoinPriceBitCloutNanos
    );

    const price =
      ((exchangeRate["SatoshisPerBitCloutExchangeRate"] /
        exchangeRate["USDCentsPerBitcoinExchangeRate"]) *
        CoinPriceBitCloutNanos) /
      1000000;

    return `$${price.toFixed(2)}`;
  };

  useEffect(async () => {
    console.log("qs", queryString);
    const response = await api.getEvents(queryString);
    console.log("events?s", response);
    setData(response);
  }, []);

  return (
    <Fragment>

      <div class="font-bold text-2xl mb-4">{title}</div>
      <table class="table-fixed text-xs mb-16">
        <thead>
          <tr>
            {type == "ended" && endedHeaders()}
            {type == "ongoing" && headers({ time: "Ends in" })}
            {type == "upcoming" && headers({ time: "Starts in" })}
          </tr>
        </thead>
        <tbody>
          {data &&

            data.map((event) => (
              <tr>
                <td>
                  <div class="flex">
                    <a
                      href={`https://www.bitclout.com/u/${event.post.data["ProfileEntryResponse"]["Username"]}`}
                    >

                      
                      <div
                        class="h-10 w-10 max-w-xs max-h-xs rounded mr-2 inline-block align-middle	"
                        style={{
                          backgroundImage: `url("https://bitclout.com/api/v0/get-single-profile-picture/${event.post.data["ProfileEntryResponse"]["PublicKeyBase58Check"]}?fallback=https://bitclout.com/assets/img/default_profile_pic.png")`,
                          backgroundSize: "cover",
                        }}
                      ></div>
                    </a>
                    <div>
                      <a
                        class="text-sm underline"
                        target="_blank"
                        href={`https://www.bitclout.com/posts/${event.post.data.PostHashHex}`}
                      >
                        <div class="font-semibold">
                          {/* {event.premium ? "💎" : ""} */}
                          {event.title}
                        </div>
                      </a>

                      {(event.tags.length > 0 || event.users.length > 0) && (
                        <div class="flex">
                          {event.tags.map((tag) => (
                            <Tag
                              name={tag}
                              tagColor="blue"
                              class="text-xxs mr-1"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {type == "ended" ? (
                  <Fragment>
                    <td class="text-right">
                      {dateFormatter.dateValue(
                        event.startTime,
                        event.precision,
                        "start"
                      )}
                    </td>
                    <td class="text-right">
                      {dateFormatter.dateValue(
                        event.endTime,
                        event.precision,
                        "end"
                      )}
                    </td>
                  </Fragment>
                ) : (
                  <td class="text-right">
                    {type == "ongoing" &&
                      dateFormatter.dateValue(
                        event.endTime,
                        event.precision,
                        "end",
                        { relative: true }
                      )}
                    {type == "upcoming" &&
                      dateFormatter.dateValue(
                        event.startTime,
                        event.precision,
                        "start",
                        { relative: true }
                      )}
                  </td>
                )}

                <td class="text-right">
                  { type == "upcoming" &&
                <div
                    className="inline-flex items-center justify-center mr-2 px-2 py-1 border border-transparent font-xs font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    { addToGCal(event) }
                  </div>
                  }
                  <div
                    className="inline-flex items-center justify-center px-2 py-1 border border-transparent font-xs font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => setEvent(event)}
                  >
                    View
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* 
      <a href={type}>See more</a> */}
    </Fragment>
  );
}
