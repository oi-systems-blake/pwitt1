import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./ViewTimesheet.style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { startOfWeek, endOfWeek } from "date-fns";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { listTimeSheets } from "../../graphql/queries";
import { format } from "date-fns";
import { formatDistanceStrict, differenceInSeconds } from "date-fns";
import SheetInfo from "./components/SheetInfo";



export function ViewTimesheet() {
  const location = useLocation();
  const pin = location.state.pin;
  const navigate = useNavigate()



  var [time, setTime] = useState(new Date());
  let [timeSheets, setTimeSheets] = useState([]);
  let [selectedSheetDate, setSelectedSheetDate] = useState(0)
  let [timeSheet, setTimeSheet] = useState([]);
  const monthName = format(time, "MMMM")
  const dayNumber = format(time, "d")
  let actualDate = format(time, "yyyyMMdd");
  let actualDateNumber = parseFloat(actualDate, 10);
  let startOfWeekAsString = format(startOfWeek(time), "yyyyMMdd");
  let actualStartOfWeek = parseFloat(startOfWeekAsString, 10);

  let awsDate = time.toISOString();

  let AWSStartOfWeek = startOfWeek(new Date(awsDate));
  let AWSEndOfWeek = endOfWeek(new Date(awsDate));

  console.log(awsDate);
  console.log(AWSStartOfWeek);

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
          AWSDate: {
            between: [AWSStartOfWeek, AWSEndOfWeek],
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



  let daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];



  function totalHoursForDay(punchesArray) {
    let ins = [];
    let outs = [];
    
    for (var i = 0; i < punchesArray.length; i++) {
      if (i % 2 === 0) {
        // index is even
        ins.push(new Date(punchesArray[i]));
      } else {
        outs.push(new Date(punchesArray[i]));
      }
    }

  return sumOfSecondsArrays(ins, outs)

  }

  function sumOfSecondsArrays(arr1, arr2) {
    let newOne1 = []
    let newSum = 0
    for (let i = 0; i < arr1.length; i++){
      newOne1.push(differenceInSeconds(new Date(arr2[i]), new Date(arr1[i])))
    newSum = newOne1.reduce((a, b) => a + b, 0)
   console.log(newSum)
    }
  let formattedSum = new Date(newSum * 1000).toISOString().substr(11, 8);
return formattedSum
  }

function callbackFunction (dataFromChild) {
  // TimeSheetGrabByDateNumber(dataFromChild)
  // setSelectedSheetDate(dataFromChild)
  navigate("/viewdetailedts", { state: { dataFromChild, pin } })
}

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

  return (
    <div className="view-ts-page">
      <Link to="/viewdetailedts">
        <button variant="outline-warning">Detail View</button>
      </Link>
      <div className="vts-cont" id="mc">
        <div className="vts-d-b" id="b-top">
          <h2 className="month">{monthName}</h2>
          <h3 className="day">{ordinal_suffix_of(dayNumber)}</h3>
        </div>

        <div className="ts-cont" id="ts-b">
          <div className="ts-h"></div>

          {Object.values(timeSheets).map((value) => (
           <SheetInfo
           key={value.dayName}
           value={value}
           callback={callbackFunction}
          />
          
  ))}

          <footer className="ts-f">
            <div className="weekly-total">40hrs 0min</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
