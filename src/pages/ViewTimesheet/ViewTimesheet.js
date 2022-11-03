import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./ViewTimesheet.style.css";
import { useLocation } from "react-router-dom";
import { startOfWeek } from "date-fns";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { listTimeSheets } from "../../graphql/queries";
import { format } from "date-fns";
import { TsTimeSheetGrab } from "./TsTimeSheetGrab";

export function ViewTimesheet() {
  const location = useLocation();
  const pin = location.state.pin;

  var [time, setTime] = useState(new Date());
  let [timeSheets, setTimeSheets] = useState([]);

  let actualDate = format(time, "yyyyMMdd");
  let actualDateNumber = parseFloat(actualDate, 10);
  let startOfWeekAsString = format(startOfWeek(time), "yyyyMMdd");
  let actualStartOfWeek = parseFloat(startOfWeekAsString, 10);

  useEffect(() => {
    setTime(new Date());
    TsTimeSheetGrab();
    console.log(actualStartOfWeek, actualDateNumber);
  }, []);

  // const { authStatus } = useAuthenticator((context) => [context.user]);
  // console.log("tspin=", pin);

  function TsTimeSheetGrab() {
    let tsGrabber = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          dateNumber: {
            between: [actualStartOfWeek, actualDateNumber],
          },
          employeeID: {
            contains: pin,
          },
        },
      })
    );
    tsGrabber.then((x) => {
      console.log(x);
      let y = x.data.listTimeSheets.items;
      setTimeSheets(y);
    });
  }
  // TsTimeSheetGrab();

  // console.log(timeSheets)
  // const TimeSheet = [
  //   {
  //     month: "May",
  //     dayNumber: 1,
  //     dayName: "Monday",
  //     hours: [
  //       ["8:00:00", "12:00:00"],
  //       ["13:00:00", "17:00:00"],
  //     ],
  //   },
  //   {
  //     month: "May",
  //     dayNumber: 2,
  //     dayName: "Tuesday",
  //     hours: [
  //       ["8:00:00", "12:00:00"],
  //       ["13:00:00", "17:00:00"],
  //     ],
  //   },
  // ];

  function timeSheetLastHour(arry) {
    let x = arry[arry.length - 1];
    let y = x.slice(-1);
    console.log(y);

    return y;
  }

  // console.log(authStatus);
  return (
    <div className="view-timesheet-page">
      <div className="view-timesheet-sidebar"></div>
      <div className="timesheet-container">
        <div className="timesheet-header timesheet-month">May</div>
        <div className="timesheet-header timesheet-days">1st - 6th</div>
        {Object.values(timeSheets).map((value, index) => {
          return (
            <div key={index} className="timesheet-row">
              <div className="timesheet-date">
                {value.dayName}, {value.month} {value.dayNumber}
              </div>
              <div className="timesheet-hour">
                <div className="timesheet-hour-text">
                  8h 00m
                  <div className="individual-hour">
                    {value.punches.map((hour, index) => (
                      <div key={index} className="ts-individual-punch">
                        {hour}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="timesheet-hour-total"> 48h00m</div>
      </div>
    </div>
  );
}
