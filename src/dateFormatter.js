import { Fragment } from "react";
import { DateTime } from "luxon";

// secenarios
// start_date
// start_date_start_time
// start_date_end_date
// start_date_start_time_end_date_end_time
// relative

const allDayLabel = (date) => date.toUTC().toFormat("MMM d, yyyy");
const dateTimeLabel = (date) => date.toLocaleString(DateTime.DATETIME_FULL);
const relativeLabe = (date) => date.toRelative();
const labelBasedOnPrecisionAndType = (date, precision, startOrEnd) => {
  const obj = {
    start_date: startOrEnd === "start" ? allDayLabel(date) : "",
    start_date_start_time:
      startOrEnd === "start" ? dateTimeLabel(date) : "",
    start_date_end_date:
      startOrEnd === "start"
        ? allDayLabel(date)
        : allDayLabel(date),
    start_date_start_time_end_date:
      startOrEnd === "start"
        ? dateTimeLabel(date)
        : allDayLabel(date),
    start_date_start_time_end_date_end_time: dateTimeLabel(date),
    start_date_end_date_end_time:
      startOrEnd === "start"
        ? allDayLabel(date)
        : dateTimeLabel(date),
    end_date: startOrEnd === "start" ? "" : allDayLabel(date),
    end_date_end_time: startOrEnd === "start" ? "" : dateTimeLabel(date),
    year: "",
    period: "",
    month: "",
    range: "",
    before: "",
    after: "",
    open: "",
    cancelled: "",
    postponed: "",
    delayed: "",
    removed: "",
    ongoing: allDayLabel(date),
    happened: "",
  };

  console.log("result?", obj[precision]);

  return obj[precision];
};

export default {

  dateValue: (date, precision, startOrEnd, opts={}) => {
    console.log("dateValue", date, precision, startOrEnd, opts);

    if (!date) {
      return "--";
    }
    const jsDate = DateTime.fromJSDate(new Date(date));

    return (<Fragment>
      { opts["relative"] &&
      <div class="font-bold">
        {jsDate.toRelative()}
      </div>
      }
      <div>{labelBasedOnPrecisionAndType(jsDate, precision, startOrEnd)}</div>
    </Fragment>)
  },
  convertTZ: (date, tzString) => {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  },
  setEST: (date) =>
    new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: "America/New_York" }
      )
    ),
};
