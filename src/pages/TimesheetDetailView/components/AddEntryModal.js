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

  let [startValue, setStartValue] = useState("8:00");
  let [endValue, setEndValue] = useState("12:00");
  let [travelerID, setTravelerID] = useState("");
  let [travelerName, setTravelerName] = useState("")
  let [tseProjectName, setTSEProjectName] = useState("")
  let [tseProjectID, setTSEProjectID] = useState("")

  const [openProjectDropDown, setOpenProjectDropDown] = useState(false);
  let [entryProjects, setEntryProjects] = useState([]);
  let [entryProjectSearch, setEntryProjectSearch] = useState("");
  let [entryDisplayProjects, setEntryDisplayProjects] = useState([]);
  let [entryTravelers, setEntryTravelers] = useState([]);

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
      travelerName: travelerName,
      timesheetID: currentSheetID,
      projectName: tseProjectName,
      projectID: tseProjectID

    };
    const newTimeSheetEntry = API.graphql(
      graphqlOperation(createTimeSheetEntrys, { input: tseDetails })
    );
    newTimeSheetEntry.then((x) => {
      console.log(x);
      ADMSetTrigger(false);
      window.location.reload()
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
    let SelectedProjId = e.currentTarget.attributes.selectedproj.value;
    let SelectedProjName = e.currentTarget.attributes.name.value;
    setTSEProjectName(SelectedProjName);
    setTSEProjectID(SelectedProjId)
    let TravFinder = base("Travelers")
      .select({
        maxRecords: 10000,
        view: "inprogress",
        filterByFormula: "({prid} = '" + SelectedProjId + "')",
      })
      .all();
    TravFinder.then((value) => setEntryTravelers(value));
  }

function FoundTraveler(e){
let SelectedTravelerId = e.currentTarget.attributes.selectedtrav.value;
let SelectedTravelerName = e.currentTarget.attributes.name.value;
setTravelerID(SelectedTravelerId)
setTravelerName(SelectedTravelerName)
setOpenProjectDropDown(false)
}

  function ATSEDropDown(projectState, travelerState) {
    if (travelerState.length === 0) {
      console.log(projectState);
      return projectState.map((displayProject) => {
        return (
          <li
            onClick={(event) => FindTravByProj(event)}
            selectedproj={displayProject.id}
            key={displayProject.id}
            project={displayProject}
            name={displayProject.fields["Project"]}
          >
            {displayProject.fields["Project"]}
          </li>
        );
      });
    } else {
      return travelerState.map((displayTraveler) => {
        return (
          <li
            onClick={(event) => FoundTraveler(event)}
            selectedtrav={displayTraveler.id}
            key={displayTraveler.id}
            traveler={displayTraveler}
            name={displayTraveler.fields["Name"]}
          >
            {displayTraveler.fields["Name"]}
          </li>
        );
      });

    }
  }

  return props.trigger ? (
    <div className="modal-background">
      <div className="modal-container">
        <h3 className="tdv-aem-header">Add Time Sheet Entry</h3>
        {travelerName}
        <br/>
        <div className="modal-selector-cont">
        <div id="tp-start">
        <label>Start Time:</label>
        
        <TimePicker
          clearIcon={null}
          disableClock={true}
          onChange={setStartValue}
          value={startValue}
        />
        </div>
        <div id="tp-end">
        <label>End Time:</label>
        
        <TimePicker
          clearIcon={null}
          disableClock={true}
          onChange={setEndValue}
          value={endValue}
        />
        </div>
        </div>
        <div className="entry-total-cont">
        <div className="entry-total">Total: 
        {TSETimeCalculator(startValue, endValue)}
        </div>
        </div>
        
          <button className="drop-down" onClick={handleDropDownOpen}>Dropdown</button>
          {openProjectDropDown ? (
            <ul className="menu">
              <input
                className="aem-search-projects"
                onChange={handleProjectSearchChange}
              ></input>
              {ATSEDropDown(entryDisplayProjects, entryTravelers)}
            </ul>
          ) : null}
        

        {/*           <label>
            Traveler ID:
            <input
              type="text"
              value={travelerID}
              onChange={(e) => setTravelerID(e.target.value)}
            />
          </label> */}
        <button className="sub-btn" type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  ) : (
    ""
  );
}
