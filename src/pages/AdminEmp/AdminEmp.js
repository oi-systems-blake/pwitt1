import "./Css/AdminEmp.style.css"
import {secure} from "../../Secret"
import Employee from "./Css/components/Employee";
import { useState, useEffect } from "react";

export function AdminEmp() {

  let [emps, setEmps] = useState([]);
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: secure }).base(
    "appqrmdFurNYpsDKm"
  );
  useEffect(() => {
console.log()
    base("Employees")
      .select({
        // Selecting the first 3 records in Brandon's Jobs:
        maxRecords: 30,
        view: "Active Employees",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          setEmps(records)
          console.log(records)
          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }, []);

  return (
    <>
      <div className="emp-page">
        <div className="emp-container">
          <div className="emp-row header">
            <div className="emp-row-emp-name header">Name</div>
            <div className="emp-row-right header">
              <div className="emp-row-status header">Status</div>
              <div className="emp-row-hours header">Hours</div>
            </div>
          </div>
          {emps.map(emp => (
            <Employee
            key={emp.id}
            emp={emp}
            />
          ))}






          
        </div>
      </div>
    </>
  );
}
