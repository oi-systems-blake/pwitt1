import React from 'react'

export default function Employee({emp}) {
  return (
    <>
    <div className="emp-row">
    <div className="emp-row-left">
      <div className="emp-row-emp-name">{emp.fields["Full Name"]} </div>
    </div>
    <div className="emp-row-right">
      <div className="emp-row-status"><button className="emp-row-clock-button" type="button">Clock In</button>Clocked Out</div>
      <div className="emp-row-hours">32h12m</div>
    </div>
  </div>
  </>
  )
}
