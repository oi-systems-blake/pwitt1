import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Css/ClockIn.style.css";
import { useState, useEffect, createContext } from "react";
import ClockInModal from "./Modals/ClockInModal";
import ErrorModal from "./Modals/ErrorModal";
import { secure } from "../../Secret";
import SideButton from "./Modals/SideButton";
import { format } from "date-fns";
import { listTimeSheets } from "../../graphql/queries";
import { createTimeSheet } from "../../graphql/mutations";

import { API, graphqlOperation } from "aws-amplify";
import { updateTimeSheet } from "../../graphql/mutations";
import {startOfWeek} from 'date-fns'

export function ClockIn() {
  let [successTrigger, setSuccessTrigger] = useState(false);
  let [pin, setPin] = useState("");
  let [employeeName, setEmployeeName] = useState("");
  let [errorTrigger, setErrorTrigger] = useState(false);
  let [sideTrigger, setSideTrigger] = useState(false);
  let [viewTimeSheetInfo, setViewTimeSheetInfo] = useState({});
  var [time, setTime] = useState(new Date());

  let Airtable = require("airtable");
  let base = new Airtable({ apiKey: secure }).base("appqrmdFurNYpsDKm");
  let airTableApiEmployeeTable = base("Employees");

 let navigate = useNavigate();

  useEffect(() => {
    var timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
 
 
  const monthNumber = format(time, "M")
  const monthName = format(time, "MMMM").toLowerCase();
  const year = format(time, "yyyy");
  const dayNumber = format(time, "d");
  const dayName = format(time, "EEEE").toLowerCase();
  const actualDateWords = format(time, "PPP eeee").toLowerCase();
  const actualDate = format(time,"yyyyMMdd")
  let actualDateNumber = parseFloat(actualDate, 10)
  const exactTime = format(time, "pp");
  let startOfWeekAsString = format(startOfWeek(time), "yyyyMMdd")
  let actualStartOfWeek = parseFloat(startOfWeekAsString, 10)
  //  console.log(actualStartOfWeek)
  //  console.log(actualDateNumber)
  // console.log(typeof tryMe)
 // let thisn = new Date(actualDateFormatted).getTime()
  // console.log(actualDateWords)
  const handlePinInputChange = (event) => {
    setPin(event.target.value);
  };

  function triggerStatement(modal) {
    modal(true);
    setTimeout(() => {
      modal(false);
    }, 2500);
    setPin("");
    setEmployeeName("");
  }

  function EmpCheck() {
    const records = airTableApiEmployeeTable
      .select({
        view: "All",
        filterByFormula: "({pin} = '" + pin + "')",
      })
      .all();
    records.then((value) => {
      console.log(value);
      console.log(value.length);
      if (value.length === 0) {
        console.log("employee not found");
        setEmployeeName("");
        return "";
      } else {
        console.log("we found an employee sir");
        setEmployeeName(value[0].fields["Preferred Name"]);
        TimeSheetCheck();
        return value;
      }
    });
  }

  function TimeSheetCheck() {
    let checker = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          dateNumber: {
            eq: actualDateNumber,
          },
          employeeID: {
            contains: pin,
          },
        },
      })
    );
    checker.then((x) => {
      let sheetLength = x.data.listTimeSheets.items.length;

      if (sheetLength === 0) {
        console.log("no timesheets please create one");
        TimeSheetCreate();
      } else if (sheetLength === 1) {
        let sheetStatus = x.data.listTimeSheets.items[0].clock_status;
        let sheetPunches = x.data.listTimeSheets.items[0].punches;
        let sheetId = x.data.listTimeSheets.items[0].id;
        console.log("1 timesheet please add a punch");
        console.log("status is", sheetStatus, "pucnhes are", sheetPunches);
        if (sheetStatus === true) {
          ClockedInTimeSheet(sheetStatus, sheetPunches, sheetId);
          console.log("sheet status is true");
        } else if (sheetStatus === false) {
          console.log(" add stamp to new array");
          ClockedOutTimeSheet(sheetStatus, sheetPunches, sheetId);
        }
      }
    });
  }

  function TimeSheetCreate() {
    const TimerDetails = {
      dayName: dayName,
      dayNumber: dayNumber,
      punches: exactTime,
      monthName: monthName,
      monthNumber: monthNumber,
      clock_status: true,
      year: year,
      dateNumber: actualDateNumber,
      employeeID: pin,
      dateName: actualDateWords
    };
    const newTimeSheet = API.graphql(
      graphqlOperation(createTimeSheet, { input: TimerDetails })
    );
    newTimeSheet.then((x) => {
      console.log(x);
    });
  }
  function ClockedInTimeSheet(status, punches, sheetID) {
    let newStatus = false;
    let oldLastPunch = punches.slice(-1);
    let lastIndex = punches.length - 1;
    let arr3 = oldLastPunch.concat(exactTime);
    punches[lastIndex] = arr3;

    let newDetails = {
      id: sheetID,
      clock_status: newStatus,
      punches: punches,
    };
    const updatedSheet = API.graphql({
      query: updateTimeSheet,
      variables: { input: newDetails },
    });
    updatedSheet.then((x) => {
      console.log(x);
    });
  }

  function ClockedOutTimeSheet(status, punches, sheetID) {
    console.log(status);
    let newStatus = true;
    console.log("imported punches", punches);
    let nextIndex = punches.length;

    let newPunches = punches.concat([exactTime]);
    console.log("new punches", newPunches);

    let ClockedOutnewDetails = {
      id: sheetID,
      clock_status: newStatus,
      punches: newPunches,
    };

    const updatedSheet = API.graphql({
      query: updateTimeSheet,
      variables: { input: ClockedOutnewDetails },
    });
    updatedSheet.then((x) => {
      console.log(x);
    });
  }

  const ClockInFunction = async () => {
    if ((pin + "").length > 4 || (pin + "").length < 4) {
      return triggerStatement(setErrorTrigger);
    }
    EmpCheck();
  };

  function ViewTimeSheetFunction() {
    if ((pin + "").length > 4 || (pin + "").length < 4) {
      return triggerStatement(setErrorTrigger);
    }
    ViewTimeSheetEmpCheck();
  }

  function TimeSheetGrab() {
   
 // let  dateTodayAndPassedWeek = []
    let grabber = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          dateNumber: {
            between: [actualStartOfWeek,actualDateNumber]
          },
          employeeID: {
            contains: pin,
          },
        },
      })
    );
    grabber.then((x) => {
      let sheetLength = x.data.listTimeSheets.items.length;

      if (sheetLength === 0) {
        console.log("no timesheets please clock in first");
      } else if (sheetLength > 0) {
        console.log(pin);
        navigate("/viewtimesheet",{ state: { pin, time } } )
      }
  })
  }
  function ViewTimeSheetEmpCheck() {
    const tsrecords = airTableApiEmployeeTable
      .select({
        view: "All",
        filterByFormula: "({pin} = '" + pin + "')",
      })
      .all()
      tsrecords.then((value) => {
        console.log(value);
        console.log(value.length);
        if (value.length === 0) {
          console.log("employee not found");
          setEmployeeName("");
          return "";
        } else {
          console.log("we found an employee sir");
          setEmployeeName(value[0].fields["Preferred Name"]);
          TimeSheetGrab()
          return value;
        }
      })
  }

  return (
    <div className="clock page">
      <div className="clock-container">
        <div className="clock-time-clock">
          <div className="time-clock date-time">
            <p className="time-clock time">{time.toLocaleTimeString()}</p>
            <p>{time.toLocaleDateString()}</p>
          </div>
        </div>
        <div className="clock-clock-input">
          {/* <h1>{arrayLength}</h1> */}
          <input
            id="clock-clock-input-specific"
            type="text"
            placeholder="Enter 4 Digit Pin"
            onChange={handlePinInputChange}
            value={pin}
          ></input>
        </div>
        <div className="clock-clock-button">
          <button className="clock special-button" onClick={ClockInFunction}>
            Clock In/Out
          </button>
        </div>
        <div className="clock-timesheet-button">
          <button
              id="clock-timesheet-button-specific"
              onClick={ViewTimeSheetFunction}
            >
              View Timesheet
            </button>
        </div>
        <div className="admin-path-button">
        <Link to="/admin">
        <button variant="outline-warning">Admin Path</button>
      </Link>
          
          <button variant="outline-warning">Sign Out</button>
        </div>
        <ClockInModal
          name={employeeName}
          trigger={successTrigger}
          setTrigger={setSuccessTrigger}
        />
        <ErrorModal trigger={errorTrigger} setTrigger={setErrorTrigger} />

        <SideButton trigger={sideTrigger} setTrigger={setSideTrigger} />
        {/* <TimesheetCreator /> */}
        {/*  <TimeTest /> */}
      </div>
    </div>
  );
}
