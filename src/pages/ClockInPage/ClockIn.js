import { Link } from "react-router-dom";
import "./Css/ClockIn.style.css";
import { useState, useEffect } from "react";
import ClockInModal from "./Modals/ClockInModal";
import ErrorModal from "./Modals/ErrorModal";
import TimeTest from "../../routing/TimeTest";
import { secure } from "../../Secret";
import { set } from "date-fns";
import SideButton from "./Modals/SideButton";
import TimesheetCreator from "../../graphql/custom/TimesheetCreator";
import { format } from "date-fns";
import { listTimeSheets } from "../../graphql/queries";
import { createTimeSheet } from "../../graphql/mutations";
import { graphqlOperation } from "aws-amplify";
import { API } from "aws-amplify";
import { updateTimeSheet } from "../../graphql/mutations";

export function ClockIn() {
  let [successTrigger, setSuccessTrigger] = useState(false);
  let [pin, setPin] = useState("");
  let [employees, setEmployees] = useState("");
  let [errorTrigger, setErrorTrigger] = useState(false);
  let [sideTrigger, setSideTrigger] = useState(false);
  var [time, setTime] = useState(new Date());

  let Airtable = require("airtable");
  let base = new Airtable({ apiKey: secure }).base("appqrmdFurNYpsDKm");
  let airTableApiEmployeeTable = base("Employees");

  const month = format(time, "MMMM");
  const year = format(time, "yyyy");
  const dayNumber = format(time, "d");
  const dayName = format(time, "EEEE");
  const actualDate = format(time, "PPPP");
  const exactTime = format(time, "pp");

  useEffect(() => {
    var timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const handlePinInputChange = (event) => {
    setPin(event.target.value);
  };

  function triggerStatement(modal) {
    modal(true);
    setTimeout(() => {
      modal(false);
    }, 2500);
    setPin("");
    setEmployees("");
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
        setEmployees("");
        return "";
      } else {
        console.log("we found an employee sir");
        setEmployees(value[0].fields["Preferred Name"]);
        TimeSheetCheck();
        return value;
      }
    });
  }

  function TimeSheetCheck() {
    let checker = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          date: {
            contains: actualDate,
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
      month: month,
      clock_status: true,
      year: year,
      date: actualDate,
      employeeID: pin,
    };
    const newTimeSheet = API.graphql(
      graphqlOperation(createTimeSheet, { input: TimerDetails })
    );
    newTimeSheet.then((x) => {
      console.log(x);
    });
  }

  // async function TimeSheetFlow(props) {
  //   let y = await TimeSheetData();
  //   await console.log(y.sheetLength);

  //   if (y.sheetLength === 0) {
  //     console.log("sheet length is 0");
  //     let k = await TimeSheetCreate();
  //     return console.log(k);
  //   } else if (y.sheetLength === 1) {
  //     console.log("sheet length is 1");
  //     if (y.sheetStatus === true) {
  //       ClockedInTimesheet(y.sheetStatus, y.sheetPunches, y.sheetID);
  //       console.log("sheet status is true");
  //     } else if (y.sheetStatus === false) {
  //       console.log(" add stamp to new array");
  //     }
  //   } else if (y.sheetLength > 1) {
  //     console.log("diff error");
  //   } else {
  //     return console.log("must be an error yo");
  //   }
  // }

  function ClockedInTimeSheet(status, punches, sheetID) {
    console.log(status);
    let newStatus = false;
    console.log(punches);
    let oldLastPunch = punches.slice(-1);
    let lastIndex = punches.length - 1;
 let arr3 = oldLastPunch.concat(exactTime)
    console.log(oldLastPunch);
    console.log(lastIndex);
    console.log(punches);
    console.log("dizn", punches[lastIndex]);
    //
    // console.log("this is it", newPunches)
    punches[lastIndex] = arr3
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
 
let newPunches = punches.concat([exactTime])
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

  //  let details = {
  //   clock_status: false,
  //   punches:
  //  }

  // const todoDetails = {
  //   id: 'some_id',
  //   description: 'My updated description!'
  // };

  // const updatedTodo = await API.graphql({ query: mutations.updateTodo, variables: {input: todoDetails}});

  // let taco = [];

  // taco[0] = [];
  // taco[0].push("7am taco");
  // taco[0].push("8am taco");
  // console.log(taco[0].length % 2);
  // let lastIndex = taco.length - 1;

  // if (taco[lastIndex].length % 2 === 0) {
  //   taco.push(["10am Taco"]);
  // } else {
  //   taco[lastIndex].push("11am Taco ");
  // }

  // ({ query: mutations.createTodo, variables: {input: todoDetails}});

  const ClockInFunction = async () => {
    if ((pin + "").length > 4 || (pin + "").length < 4) {
      return triggerStatement(setErrorTrigger);
    }
    EmpCheck();
  };

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
          <button
            className="clock special-button"
            variant="warning"
            onClick={ClockInFunction}
          >
            Clock In/Out
          </button>
        </div>
        <div className="clock-timesheet-button">
          <Link to="/viewtimesheet/:1245">
            <button id="clock-timesheet-button-specific" variant="warning">
              View Timesheet
            </button>
          </Link>
        </div>
        <div className="admin-path-button">
          <Link to="/admin">
            <button variant="outline-warning">Admin Path</button>
          </Link>
          <button variant="outline-warning">Sign Out</button>
        </div>
        <ClockInModal
          name={employees}
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
