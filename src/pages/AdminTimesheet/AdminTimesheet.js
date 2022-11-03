import { Button } from "@aws-amplify/ui-react";
import "./AdminTimesheet.style.css";
import { secure } from "../../Secret";
import { useState, useEffect, createContext } from "react";
import EmpByAdmin from "./components/EmpByAdmin";

export function AdminTimesheet() {
  let Airtable = require("airtable");
  let base = new Airtable({ apiKey: secure }).base("appqrmdFurNYpsDKm");
  let airTableApiEmployeeTable = base("Employees");
 
 
  let [signedInAdmin, setSignedInAdmin] = useState("Ryan Miller")
  let [empsBySup, setEmpsBySup] = useState([])
  let [displayEmpsBySup, setDisplayEmpsBySup] = useState([])


useEffect(() => {
  GrabEmpByAdmin()
},[])




function GrabEmpByAdmin() {
  const empRecords = airTableApiEmployeeTable
  .select({
    view: "AdminTimesheetView",
    filterByFormula: "({Supervisor} = '" + signedInAdmin + "')",
  })
  .all();
  empRecords.then((emp) => {
  console.log("hey", emp);
  setEmpsBySup(emp);
  setDisplayEmpsBySup(emp);
});
}

  return (
    <div className="admin-timesheet-page">
      <div className="main-container">
        <div className="page-left-container" id="plc">
          <select className="pay-period" itemID="pay-period">
            <option>5/6/22-5/11/22</option>
          </select>
          <header className="Employee-list-header">Employees</header>
          {displayEmpsBySup.map((displayEmp) => (
            <EmpByAdmin key={displayEmp.id} Emp={displayEmp} />
          ))}
        </div>

        <div className="sheets" id="tc">
          <div className="container-header">
            <div className="header-label">Date</div>
            <div className="header-label">In</div>
            <div className="header-label">out</div>
            <div className="header-label">total</div>
            <div className="header-label">OT</div>
          </div>

          <div className="tsr">
            <div className="row-label">5/1/22</div>
            <div className="row-label">7:00AM</div>
            <div className="row-label">4:00PM</div>
            <div className="row-label">8</div>
            <div className="row-label">0</div>
          </div>
          <div className="tsr">
            <div className="row-label">5/1/22</div>
            <div className="row-label">7:00AM</div>
            <div className="row-label">4:00PM</div>
            <div className="row-label">8</div>
            <div className="row-label">0</div>
          </div>
          <div className="tsr">
            <div className="row-label">5/1/22</div>
            <div className="row-label">7:00AM</div>
            <div className="row-label">4:00PM</div>
            <div className="row-label">8</div>
            <div className="row-label">0</div>
          </div>
          <div className="tsr">
            <div className="row-label">5/1/22</div>
            <div className="row-label">7:00AM</div>
            <div className="row-label">4:00PM</div>
            <div className="row-label">8</div>
            <div className="row-label">0</div>
          </div>
          <div className="tsr">
            <div className="row-label">5/1/22</div>
            <div className="row-label">7:00AM</div>
            <div className="row-label">4:00PM</div>
            <div className="row-label">8</div>
            <div className="row-label">0</div>
          </div>
          <div className="tsr">
            <div className="row-label">5/1/22</div>
            <div className="row-label">7:00AM</div>
            <div className="row-label">4:00PM</div>
            <div className="row-label">8</div>
            <div className="row-label">0</div>
          </div>
          <div className="tsr">
            <div className="row-label">5/1/22</div>
            <div className="row-label">7:00AM</div>
            <div className="row-label">4:00PM</div>
            <div className="row-label">8</div>
            <div className="row-label">0</div>
          </div>

          <div className="bottom-cap" id="tcf">
            <div className="total">Total</div>
            <div className="weekly-total">12</div>
            <div className="weekly-ot-total">2</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
