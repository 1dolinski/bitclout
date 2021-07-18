import { DateTime } from "luxon";
import Tag from "./Tag.js";
import { Fragment } from "react";

const monthDay = (isoDate) => DateTime.fromISO(isoDate).toFormat("MMM dd");
const hasPremiumAccess = () =>
  localStorage.getItem("bitcloutoffersPremiumCalendar") === "DiamondCalendar";

const dateLabel = (dateStr, isAllDay) => {
  var date = DateTime.fromSeconds(dateStr);
  if (isAllDay) {
    return date
      .setZone("America/New_York", { keepLocalTime: true })
      .toFormat("MMM dd");
  }

  return date
    .setZone("America/New_York", { keepLocalTime: true })
    .toFormat("MMM dd, h:mm a");
};

const localDateTime = (dateStr) => {
  return DateTime.fromSeconds(dateStr);
};

const typeColors = (type) => {
  const types = {
    Newsletter: "gray",
    Meetup: "red",
    Announcement: "gray",
    Giveaway: "green",
    Merch: "green",
    NFT: "green",
    Discord: "gray",
    Event: "red",
    Contest: "green",
    Interview: "gray",
  };

  return types[type] || "green";
};

export default function Row(props) {
  const {
    premium,
    allDay,
    dateValue,
    timeZone,
    url,
    title,
    profilePic,
    username,
    createdAt,
  } = props;

  return (
    <Fragment>
      {premium && !hasPremiumAccess() ? (
        <div className={"p-8 mt-4 bg-blue-100 font-semibold flex"}>
          <div
            class="w-24 h-24 max-w-xs rounded mr-2"
            style={{
              "background-image": `url("${profilePic}")`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="flex-1">
            <span className="bg-red-100 text-red-500 rounded font-bold p-1">
              {dateLabel(dateValue, allDay)}
            </span>
            {allDay ? (
              <></>
            ) : (
              <span className="ml-2 text-gray-400">
                {localDateTime(dateValue).toRelative()}
              </span>
            )}
            <p className="md:text-lg mt-4 font-semibold">
              Enable 💎 access to see this event
            </p>
          </div>
        </div>
      ) : (
        <div className={`p-8 mt-4 ${premium ? "bg-yellow-100" : "border"}`}>
          <div className="flex">
            <a href={`https://www.bitclout.com/u/${username}`} target="_blank">
              <div
                class="w-24 h-24 max-w-xs rounded mr-2"
                style={{
                  "background-image": `url("${profilePic}")`,
                  backgroundSize: "cover",
                }}
              ></div>
            </a>
            <div className="flex-1">
              <span className="bg-red-100 text-red-500 rounded font-bold p-1">
                {dateLabel(dateValue, allDay)}
              </span>
              {allDay ? (
                <></>
              ) : (
                <span className="ml-2 text-gray-400">
                  {localDateTime(dateValue).toRelative()}{" "}
                  {premium ? "💎 Access" : ""}
                </span>
              )}

              <div className="flex">
                <a
                  className="md:text-2xl font-semibold"
                  href={url}
                  target="_blank"
                >
                  {title}{" "}
                </a>
              </div>
              <span className="pr-2">
                <Tag name={username} tagColor="blue" isAt />
              </span>
            </div>

            <div className="py-4 pl-8 md:pr-8 w-24 md:text-lg">
              {createdAt > Date.now() - 1000 * 60 * 60 * 24 * 2 * 2 && (
                <span className="p-2 font-semibold bg-yellow-200 rounded">
                  NEW
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
