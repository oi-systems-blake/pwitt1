import React from "react";
import { useState, useEffect } from "react";
import { secure } from "../../../Secret";



export default function EmpByAdmin({...props}) {
 



  return (
  
   <div className="employee-row">{props.Emp.fields["Preferred Name"]}</div>
 
  
  );
}
