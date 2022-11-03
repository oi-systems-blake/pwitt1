import { Button } from "@aws-amplify/ui-react";
import "./AdminTimesheet.style.css";

export function AdminTimesheet() {
  return (
    <>
      <div className="admin-timesheet-page">
      <div className='main-container'>
      <div className="page-left-container" id="plc">
       <select className="pay-period" itemID="pay-period">
       <option>5/6/22-5/11/22</option>
       </select>
       <header className="Employee-list-header">Employees</header>
       <div className="employee-row">A</div>
       <div className="employee-row">B</div>
       <div className="employee-row">C</div>
       <div className="employee-row">D</div>
       <div className="employee-row">E</div>
       <div className="employee-row">F</div>
       <div className="employee-row">G</div>
       <div className="employee-row">H</div>
       <div className="employee-row">I</div>
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
    </>
  );
}
