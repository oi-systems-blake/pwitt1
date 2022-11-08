import React from 'react'
import "./TimesheetDetailView.style.css"

export default function TimesheetDetailView() {
 
 
 
 
  return (
    <div className="tsdv-page">
  <div className="main-cont">
    <div className="dt-b" id="box 1">
      <h2 className="month">May</h2>
      <h3 className="day">1st</h3>
    </div>

    <div className="ts-c" id="bc-1">
      <h3>Timesheet</h3>
      <button className='tsdv-eb'>Edit</button>
        <div className="tsdv-h">
          <div className="ts-h-lab">Date</div>
          <div className="ts-h-lab">Clock In</div>
          <div className="ts-h-lab">Clock Out</div>
          <div className="ts-h-lab">Total</div>
        </div>

        <div className="tsdv-r">
          <div className="ts-val">May 1st</div>
          <div className="ts-val">7:00AM</div>
          <div className="ts-val">4:00PM</div>
          <div className="ts-val">8h 00m</div>
        </div>
      
    </div>

    <div className="tse-c" id="bc-2">
      <h3>Timesheet Entry</h3>
      <button className='tsdv-aeb'>+Add Entry</button>
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
      <button className='tsdv-wvb'>Weekly View</button>
    </div>
  </div>
</div>
  )
}

