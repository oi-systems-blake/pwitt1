import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./ViewTimesheet.style.css";
import { useLocation } from "react-router-dom";
import { startOfWeek } from "date-fns";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { listTimeSheets } from "../../graphql/queries";
import { format } from "date-fns";
import { TsTimeSheetGrab } from "./TsTimeSheetGrab";

export function ViewTimesheet() {
  const location = useLocation();
  const pin = location.state.pin;

  var [time, setTime] = useState(new Date());
  let [timeSheets, setTimeSheets] = useState([]);

  let actualDate = format(time, "yyyyMMdd");
  let actualDateNumber = parseFloat(actualDate, 10);
  let startOfWeekAsString = format(startOfWeek(time), "yyyyMMdd");
  let actualStartOfWeek = parseFloat(startOfWeekAsString, 10);

  useEffect(() => {
    setTime(new Date());
    TsTimeSheetGrab();
    console.log(actualStartOfWeek, actualDateNumber);
  }, []);

  // const { authStatus } = useAuthenticator((context) => [context.user]);
  // console.log("tspin=", pin);

  function TsTimeSheetGrab() {
    let tsGrabber = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          dateNumber: {
            between: [actualStartOfWeek, actualDateNumber],
          },
          employeeID: {
            contains: pin,
          },
        },
      })
    );
    tsGrabber.then((x) => {
      console.log(x);
      let y = x.data.listTimeSheets.items;
      setTimeSheets(y);
    });
  }

  function timeSheetLastHour(arry) {
    let x = arry[arry.length - 1];
    let y = x.slice(-1);
    console.log(y);

    return y;
  }



  return (
    <div className="view-ts-page">
      <Link to="/viewdetailedts">
        <button variant="outline-warning">Detail View</button>
      </Link>
      <div className="vts-cont" id="mc">
        <div className="vts-d-b" id="b-top">
          <h2 className="month">May</h2>
          <h3 className="day">1st</h3>
        </div>

        <div className="ts-cont" id="ts-b">
          <div className="ts-h"></div>

          
            <div className="ts-r">
           
              <div className="left-b">
               day
                <div className="mm-dd">May 1st</div>
              </div>
              <div className="right-b">
                7:00AM - 4:00PM
                <div className="hh-mm">8h 00m</div>
              </div>
            </div>
         

          <footer className="ts-f">
            <div className="weekly-total">40hrs 0min</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
