
import logo from "../resources/pwi-logo.jpg"
import "./CustomNavBar.css"
import { Outlet } from "react-router-dom";
import { AdminEmp } from "../pages/AdminEmp/AdminEmp"
import { Link } from 'react-router-dom';



export function AdminNavBar() {
    


    return (
        <>
        <div className="adminNav">
        <div className="navbar-container">
          <div className="navbar-img" id='image'>
            <img
              src={logo}
              width="75"
              height="50"
              className="d-inline-block align-top"
              alt="pwi logo"
            />
            </div>
            <ul class='path-container'>
          <li><a href="/admin/employee">Employees</a></li>
          <li><a href="/admin/projects">Projects</a></li>
          <li><a href="/admin/timesheet">Timesheets</a></li>
          </ul>
          <div class='button-container'>
          <button onClick={console.log("fix me please")}>Sign Out</button>
          </div>
          
        </div>
      </div>
      <Outlet/>
        </>
    );
}

