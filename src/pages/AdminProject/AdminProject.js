import "./AdminProject.style.css";
import { Airtable, Table } from "airtable";
import { useState, useEffect } from "react";
import Project from "./components/Project";
import { secure } from "../../Secret";

export function AdminProject() {
  let [projects, setProjects] = useState([]);
  let [projectSearch, setProjectSearch] = useState("");

  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: secure }).base("appdxUzxbQJdbR8fz");

  // const handlePinSearchChange = (event) => {
  //   let x = ""
  //   console.log("first x", x)
  //    x = x + event.target.value
  //   console.log("second x", x)
  //   this.setProjectSearch({value: event.target.value}, function () {
  //     console.log(this.state.value);
  // });
  //   console.log("and finally", x)
  
  // };

  async function handlePinSearchChange(event) {
    await setProjectSearch(event.target.value);
    await console.log(event.target.value)
}

  const handleClick = () => {
    let result = projects.filter((proj) => {
      console.log(typeof (proj.fields["Project ID (auto)"] + proj.fields.Project))
      return (proj.fields["Project ID (auto)"] + proj.fields.Project).toLowerCase().includes(projectSearch);
    });
    setProjects(result)
  };


  useEffect(() => {
    console.log();
    let runit = base("Projects")
      .select({
        maxRecords: 10000,
        view: "Blake's View",
      })
      .all();
    runit.then((proj) => {
      console.log("hey", proj);
      setProjects(proj);
    });

    // base("Projects")
    //   .select({
    //     // Selecting the first 3 records in Brandon's Jobs:
    //     maxRecords: 1000,
    //     view: "Blake's View",
    //   })
    //   .eachPage(
    //     function page(records, fetchNextPage) {
    //       // This function (`page`) will get called for each page of records.

    //         setProjects(records)
    //       console.log(records)
    //       // To fetch the next page of records, call `fetchNextPage`.
    //       // If there are more records, `page` will get called again.
    //       // If there are no more records, `done` will get called.
    //       fetchNextPage();
    //     },
    //     function done(err) {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
    //     }
    //   );
  },[]);


  return (
    <>
      <div className="project-page">
        <input
        //  value={projectSearch}
          className="search-projects"
          onChange={handlePinSearchChange}
        ></input><button className="search-projects" onClick={handleClick}>Click</button>
        <div className="project-container">
          <div className="project-row header">
            <div className="project-row-project-name header">Project</div>
            <div className="project-row-right header">
              <div className="project-row-status header">Status</div>
              <div className="project-row-hours header">Hours</div>
            </div>
          </div>
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
