import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./ViewTimesheet.style.css";

export function ViewTimesheet() {
 
 // const { authStatus } = useAuthenticator((context) => [context.user]);

  const TimeSheet = [
    {
      month: "May",
      dayNumber: 1,
      dayName: "Monday",
      hours: [
        ["8:00:00", "12:00:00"],
        ["13:00:00", "17:00:00"],
      ],
    },
    {
      month: "May",
      dayNumber: 1,
      dayName: "Monday",
      hours: [
        ["8:00:00", "12:00:00"],
        ["13:00:00", "17:00:00"],
      ],
    },


    
  ];

  function timeSheetLastHour(arry) {
    let x = arry[arry.length - 1];
    let y = x.slice(-1);
    console.log(y);

    return y;
  }


  console.log(TimeSheet);
 // console.log(authStatus);
  return (
   <>
     <div className="view-timesheet-page">
        <div className="view-timesheet-sidebar"></div>

        <div className="timesheet-container">
          <div className="timesheet-header timesheet-month">May</div>
          <div className="timesheet-header timesheet-days">1st - 6th</div>
          {TimeSheet.map((day) => (
            <div className="timesheet-row">
              <div className="timesheet-date">
                {day.dayName}, {day.month} {day.dayNumber}
              </div>
              <div className="timesheet-hour">
                <div className="timesheet-hour-text">
                  8h 00m {day.hours.map((hour) =>(<div className="individual-hour">{hour[0] + " - " + hour[1]}</div>))}
                </div>
              </div>
            </div>
          ))}


          <div className="timesheet-hour-total"> 48h00m</div>
        </div>
          </div>
    </>
  );
}
