import React from "react";
import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import { createTimeSheetEntrys } from "../../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { secure } from "../../../Secret";

export default function AddEntryModal({ ...props }) {
  let currentSheetID = props.sheetID;
  let currentSheetPin = props.pin;
  let ADMSetTrigger = props.setTrigger;
  let [startValue, setStartValue] = useState("10:00");
  let [endValue, setEndValue] = useState("12:00");
  let [travelerID, setTravelerID] = useState("");

  const [openProjectDropDown, setOpenProjectDropDown] = React.useState(false);
  let [entryProjects, setEntryProjects] = useState([]);
  let [entryProjectSearch, setEntryProjectSearch] = useState("");
  let [entryDisplayProjects, setEntryDisplayProjects] = useState([]);

  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: secure }).base("appdxUzxbQJdbR8fz");

  useEffect(() => {
    console.log();
    let runit = base("Projects")
      .select({
        maxRecords: 10000,
        view: "inprogress",
      })
      .all();
    runit.then((project) => {
      console.log("hey", project);
      setEntryProjects(project);
      setEntryDisplayProjects(project);
    });
  }, []);

  const handleDropDownOpen = () => {
    setOpenProjectDropDown(!openProjectDropDown);
  };

  function hmsToSecondsOnly(str) {
    var p = str.split(":"),
      s = 0,
      m = 1;

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
    }

    return s;
  }

  function TSETimeCalculator(startTime, endTime) {
    let startTimeInSeconds = hmsToSecondsOnly(startTime);
    let endTimeInSeconds = hmsToSecondsOnly(endTime);
    let tseAllotedTime = endTimeInSeconds - startTimeInSeconds;
    let formattedAllotedTime = new Date(tseAllotedTime * 60 * 1000)
      .toISOString()
      .substr(11, 8);
    let finalResult = formattedAllotedTime.slice(0, -3);
    return finalResult;
  }

  function addTSE() {
    let AH = TSETimeCalculator(startValue, endValue);
    
    const tseDetails = {
      start_time: startValue,
      stop_time: endValue,
      allocated_hours: AH,
      EmployeeID: currentSheetPin,
      travelersID: travelerID,
      timesheetID: currentSheetID,
    };
    const newTimeSheetEntry = API.graphql(
      graphqlOperation(createTimeSheetEntrys, { input: tseDetails })
    );
    newTimeSheetEntry.then((x) => {
      console.log(x);
      ADMSetTrigger(false);
    });
  }

  function handleSubmit(event) {
    // 👇️ prevent page refresh
    event.preventDefault();
    console.log("form submitted ✅");
    addTSE();
  }
  function handleProjectSearchChange(event) {
    setEntryProjectSearch(event.target.value);
    let result = entryProjects.filter((project) => {

      return (project.fields["Project ID (auto)"] + project.fields.Project)
        .toLowerCase()
        .includes(entryProjectSearch);
    });
    setEntryDisplayProjects(result);
  }


function FindTravByProj(e) {
  let SelectedProjId = e.currentTarget.attributes.selectedproj.value
console.log(SelectedProjId)
}

  return props.trigger ? (
    <div className="modal-background">
      <div className="modal-container">
        <h1 className="tdv-aem-header">Add Time Sheet Entry</h1>
         
        <TimePicker
          clearIcon={null}
          disableClock={true}
          onChange={setStartValue}
          value={startValue}
        />
        <br />

        <label>End Time:</label>
        <TimePicker
          clearIcon={null}
          disableClock={true}
          onChange={setEndValue}
          value={endValue}
        />
        <br />




        {TSETimeCalculator(startValue, endValue)}
        <br />

        <div className="dropdown">
          <button onClick={handleDropDownOpen}>Dropdown</button>
          {openProjectDropDown ? (
            <ul className="menu">
            <input
            className="aem-search-projects"
            onChange={handleProjectSearchChange}
          ></input>
              {entryDisplayProjects.map((displayProject) => (
                <li onClick={(event) => FindTravByProj(event)} selectedproj={displayProject.id} key={displayProject.id} project={displayProject}>
                  {displayProject.fields["Project"]}
                </li>
              ))}
            </ul>
          ) : null}
         
        </div>

        {/*           <label>
            Traveler ID:
            <input
              type="text"
              value={travelerID}
              onChange={(e) => setTravelerID(e.target.value)}
            />
          </label> */}
        <button type="submit" onClick={handleSubmit}></button>
      </div>
    </div>
  ) : (
    ""
  );
}
