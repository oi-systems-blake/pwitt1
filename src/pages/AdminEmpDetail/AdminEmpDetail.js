import "./AdminEmpDetails.style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { secure } from "../../Secret";
import ProfileCard from "./components/ProfileCard";
import AETimesheet from "./components/AETimesheet";
import { startOfWeek, endOfWeek } from "date-fns";
import { API, graphqlOperation } from "aws-amplify";
import { listTimeSheets } from "../../graphql/queries";

export function AdminEmpDetail({ ...props }) {
  const location = useLocation();
  let adminEmpPin = location.state.targetPin;
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: secure }).base("appqrmdFurNYpsDKm");

  let [timesheetObject, setTimesheetObject]= useState({});
  let [profileCardObject, setProfileCardObject] = useState({});
  var [time, setTime] = useState(new Date());

  let awsDate = time.toISOString();
  let AWSStartOfWeek = startOfWeek(new Date(awsDate));
  let AWSEndOfWeek = endOfWeek(new Date(awsDate));
  let SOW = AWSStartOfWeek.toISOString();
  let EOW = AWSEndOfWeek.toISOString();

  let [sheetGrabSOW, setSheetGrabSOW] = useState(SOW);
  let [sheetGrabEOW, setSheetGrabEOW] = useState(EOW);

  function EmpProfileCardGetter(currentPin) {
    let adminEmpProfileGetter = base("Employees")
      .select({
        // Selecting the first 3 records in Brandon's Jobs:
        maxRecords: 10,
        view: "Active Employees",
        filterByFormula: "({pin} = '" + currentPin + "')",
      })
      .all();
    adminEmpProfileGetter.then((x) => {
      setProfileCardObject(x);
    });
  }

  function EmpTimesheetGetter(currentPin) {
    let etsGrabber = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          AWSDate: {
            between: [sheetGrabSOW, sheetGrabEOW],
          },
          employeeID: {
            contains: currentPin,
          },
        },
      })
    );
    etsGrabber.then((x) => {
      console.log(x);
      let y = x.data.listTimeSheets.items;
      setTimesheetObject(y);
    });
  }

  useEffect(() => {
    EmpProfileCardGetter(adminEmpPin);
    EmpTimesheetGetter(adminEmpPin)
  }, [sheetGrabSOW]);

  function aeinfoCallback(e) {
    console.log(e);
  }

  let daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

function filterSheets(sheets, daysOfWeek){
  let result = sheets.filter((sheet) => sheet.dayName === daysOfWeek);
  if (result.length > 0){
return(
  <div className="record">
  <div className="date-box">
    Mon
    <div className="month-day">May 1st</div>
  </div>
  <div className="hours-box">
    7:00AM - 4:00PM
    <div className="daily-total">8h 00m</div>
  </div>
</div>
)

  } else {
    return(
      <div className="record">
      <div className="date-box">
        DOW
        <div className="month-day">month day</div>
      </div>
      <div className="hours-box">
        00AM - 00PM
        <div className="daily-total">00m</div>
      </div>
    </div>
    )
  }


}


  console.log(adminEmpPin);
  return (
    <div className="emp-detail-page">
      <div className="page-container">
        {Object.values(profileCardObject).map((info, index) => (
          <ProfileCard
            key={index}
            aeinfo={info}
            aeentrycallback={aeinfoCallback}
          />
        ))}
        <div className="timesheet">
        <div className="header-bar">May 1st-6th</div>

        {daysOfWeek.map((days) => filterSheets(timesheetObject, days))}
        <footer className="footer-bar">
          <div className="sheet-totals">40hrs 0min</div>
        </footer>
      </div>
  

      </div>
    </div>
  );
}
