import React from 'react'

export default function Employee({emp}) {
  return (
    
    <div className="emp-box-r">
      <div className="emp-box-r-l">{emp.fields["Full Name"]} </div>
      <div className="emp-box-r-l">Clocked Out</div>
      <div className="emp-box-r-l">32h12m</div>
      
    
  </div>
  )
}
