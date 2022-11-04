import { Button } from "@aws-amplify/ui-react";
import "./AdminTimesheet.style.css";
import { secure } from "../../Secret";
import { useState, useEffect, createContext } from "react";
import EmpByAdmin from "./components/EmpByAdmin";
import { API, graphqlOperation } from "aws-amplify";
import { listTimeSheets } from "../../graphql/queries";
import EmpInfoByAdmin from "./components/EmpInfoByAdmin";


export function AdminTimesheet() {
  let Airtable = require("airtable");
  let base = new Airtable({ apiKey: secure }).base("appqrmdFurNYpsDKm");
  let airTableApiEmployeeTable = base("Employees");

  let [signedInAdmin, setSignedInAdmin] = useState("Ryan Miller");
  let [empsBySup, setEmpsBySup] = useState([]);
  let [displayEmpsBySup, setDisplayEmpsBySup] = useState([]);
  let [selectedEmp, setSelectedEmp] = useState("");
  let [selectedEmpPin, setSelectedEmpPin] = useState("");
  let [displayTimesheets, setDisplayTimesheets] = useState([])
  let [startSearchTime, setStartSearchTime] = useState("")
  let [endSearchTime, setEndSearchTime] = useState("")
  
  
  useEffect(() => {
    GrabEmpByAdmin();
  }, []);

  function callback(dataFromChild) {
    setSelectedEmp(dataFromChild)
    let result = empsBySup
      .filter((emp) => {

        return emp.fields["Preferred Name"]
          .includes(dataFromChild);

      })

    setSelectedEmpPin(result[0].fields.pin);
    GrabSelectedEmpsTimesheets(result[0].fields.pin)
  }


  
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

  function GrabSelectedEmpsTimesheets(correctPin) {
    console.log(correctPin);
    let tsGrabber = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          // dateNumber: {
          //   between: [startSearchTime, endSearchTime],
          // },
          employeeID: {
            contains: correctPin,
          },
        },
      })
    );
    tsGrabber.then((x) => {
      let y = x.data.listTimeSheets.items;
      setDisplayTimesheets(x.data.listTimeSheets.items);
      console.log(y)
    });
  }

  return (
    <div className="admin-timesheet-page">
      <div className="main-container">
        <div className="page-left-container" id="plc">
          <select className="pay-period" itemID="pay-period">
            <option>5/6/22-5/11/22</option>
          </select>
          
          <header className="employee-list-header">
            Employees
            <br />
            {selectedEmp}
          </header>
          
          {displayEmpsBySup.map((displayEmp) => (
            <EmpByAdmin
              key={displayEmp.id}
              Emp={displayEmp}
              callback={callback}
            />
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


           {displayTimesheets.map((timers) => (
            
            <EmpInfoByAdmin
              key={timers.id}
              timers={timers}
            />
          ))} 




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
