import React from 'react'

export default function Employee({...props}) {
 let emp = props.emp
 let AECallback = props.callback
 
 
  return (
    
    <div onClick={(event) => AECallback(event)} emp={emp} pin={emp.fields.pin} className="emp-box-r">
      <div className="emp-box-r-l">{emp.fields["Full Name"]} </div>
      <div className="emp-box-r-l">{emp.fields.Mobile}</div>
      <div className="emp-box-r-l">{emp.fields["Primary Email"]}</div>
      
  </div>
  )
}
