import React from 'react'
import "./TimesheetDetailView.style.css"
import { useLocation, useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { listTimeSheets } from '../../graphql/queries';
import DetailSheetInfo from './components/DetailSheetInfo';
import AddEntryModal from './components/AddEntryModal';
import DetailEntryInfo from './components/DetailEntryInfo';
import EditTSModal from './components/EditTSModal';


export default function TimesheetDetailView() {
  const location = useLocation();
  const navigate = useNavigate()
  const pin = location.state.pin;
  const sheet = location.state.sheetData;
  const sheetID = location.state.sheetID

  let [timeSheet, setTimeSheet] = useState([]);
  let [addEntryTrigger, setAddEntryTrigger] = useState(false);
  let [editEntryTrigger, setEditEntryTrigger] = useState(false);

   useEffect(() => {
    TimeSheetGrabByDateNumber(sheet)
   }, []);


   function TimeSheetGrabByDateNumber(dfc) {
    let tsGrabber = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          dateNumber: {
            eq: dfc,
          },
          employeeID: {
            contains: pin,
          },
        },
      })
    );
    tsGrabber.then((x) => {
      console.log(x);
  console.log(x.data.listTimeSheets.items)
       setTimeSheet(x.data.listTimeSheets.items);
    })
  }

function detailCallback(e){
  setEditEntryTrigger(true)
}

function AddTSEButton(){
  setAddEntryTrigger(true)
}
  return (
    <div className="tsdv-page">
  <div className="main-cont">

        {Object.values(timeSheet).map((value, index) => (
          <DetailSheetInfo
          key={index}
          value={value}
          callback={detailCallback}
         />
         
 ))}

      
    

    <div className="tse-c" id="bc-2">
      <h3>Timesheet Entry</h3>
      <button onClick={() => AddTSEButton()} className='tsdv-aeb'>+Add Entry</button>
        <div className="tse-h">
          <div className="tse-h-lab">Project</div>
          <div className="tse-h-lab">Travaler</div>
          <div className="tse-h-lab">Start Time</div>
          <div className="tse-h-lab">End Time</div>
        </div>

        <div className="tse-r">
          <div className="tse-val">Project Crain</div>
          <div className="tse-val">Welding</div>
          <div className="tse-val">7:00AM</div>
          <div className="tse-val">8:00AM</div>
        </div>
     
        <button onClick={() => {navigate("/viewtimesheet", { state: { pin } })}} className='tsdv-wvb'>Weekly View</button>
    </div>
    <AddEntryModal pin={pin} sheetID={sheetID} trigger={addEntryTrigger} setTrigger={setAddEntryTrigger} />
    <EditTSModal pin={pin} sheetID={sheetID} trigger={editEntryTrigger} setTrigger={setEditEntryTrigger} />
  </div>
</div>
  )
}

