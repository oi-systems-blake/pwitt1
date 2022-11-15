import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./ViewTimesheet.style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { startOfWeek, endOfWeek } from "date-fns";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { listTimeSheets } from "../../graphql/queries";
import { format, subDays, addDays, parseISO } from "date-fns";
import { formatDistanceStrict, differenceInSeconds } from "date-fns";
import SheetInfo from "./components/SheetInfo";

export function ViewTimesheet() {
  const location = useLocation();
  const pin = location.state.pin;
  const navigate = useNavigate();

  var [time, setTime] = useState(new Date());
  let [timeSheets, setTimeSheets] = useState([]);
  let [selectedSheetDate, setSelectedSheetDate] = useState(0);
  let [timeSheet, setTimeSheet] = useState([]);

  const monthName = format(time, "MMMM");
  const dayNumber = format(time, "d");
  let actualDate = format(time, "yyyyMMdd");
  let actualDateNumber = parseFloat(actualDate, 10);
  let startOfWeekAsString = format(startOfWeek(time), "yyyyMMdd");
  let actualStartOfWeek = parseFloat(startOfWeekAsString, 10);

  let awsDate = time.toISOString();

  let AWSStartOfWeek = startOfWeek(new Date(awsDate));
  let AWSEndOfWeek = endOfWeek(new Date(awsDate));

  let SOW = AWSStartOfWeek.toISOString();
  let EOW = AWSEndOfWeek.toISOString();

  let [sheetGrabSOW, setSheetGrabSOW] = useState(SOW);
  let [sheetGrabEOW, setSheetGrabEOW] = useState(EOW);

  useEffect(() => {
    setTime(new Date());
    TsTimeSheetGrab();
  }, [sheetGrabSOW]);

  function TsTimeSheetGrab() {
    let tsGrabber = API.graphql(
      graphqlOperation(listTimeSheets, {
        filter: {
          AWSDate: {
            between: [sheetGrabSOW, sheetGrabEOW],
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

    return sumOfSecondsArrays(ins, outs);
  }

  function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  function sumOfSecondsArrays(arr1, arr2) {
    let newOne1 = [];
    let newSum = 0;
    for (let i = 0; i < arr1.length; i++) {
      newOne1.push(differenceInSeconds(new Date(arr2[i]), new Date(arr1[i])));
      newSum = newOne1.reduce((a, b) => a + b, 0);
      console.log(newSum);
    }
    let formattedSum = new Date(newSum * 1000).toISOString().substr(11, 8);
    return formattedSum;
  }

  function callbackFunction(dataFromChild) {
    // TimeSheetGrabByDateNumber(dataFromChild)
    // setSelectedSheetDate(dataFromChild)
  }
  function makeIsoReadable(preFormatTime) {
    let newTime = format(new Date(preFormatTime), "pp");
    return newTime;
  }

  function timeSheetLastHour(arry) {
    const lastItem = arry[arry.length - 1];
    return lastItem;
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

  function sheetSelected(event) {
    let sheetData = event.currentTarget.attributes.propy.value;
    console.log(event);
    navigate("/viewdetailedts", { state: { sheetData, pin } });
  }

  function TsLeftArrowButton() {
    let newSOW = subDays(parseISO(SOW), 7);
    let newEOW = subDays(parseISO(EOW), 7);
    //  let  backWeekEnd = subDays(EOW.parseISO(), 7);
    // setSheetGrabSOW(backWeekStart)
    // setSheetGrabEOW(backWeekEnd)
    setSheetGrabSOW(newSOW);
    setSheetGrabEOW(newEOW);
    console.log("start", newSOW, "EOW", newEOW);
  }

  function TsRightArrowButton() {
    let newSOW = addDays(parseISO(SOW), 7);
    let newEOW = addDays(parseISO(EOW), 7);
    //  let  backWeekEnd = subDays(EOW.parseISO(), 7);
    // setSheetGrabSOW(backWeekStart)
    // setSheetGrabEOW(backWeekEnd)
    setSheetGrabSOW(newSOW);
    setSheetGrabEOW(newEOW);
    console.log("start", newSOW, "EOW", newEOW);
  }
  let newSum = 0;
  let arr1 = [];
  let arr2 = [];
 let totalarr = []
  function WeeklyHourTotal(dayHours) {
    console.log(dayHours);
    arr1.push(dayHours);
    console.log(arr1);

    let sum = 0;
    try {
      var a = dayHours.split(":");
      var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      sum = sum + seconds;
      arr2.push(seconds);
      console.log(arr2);
      newSum = arr2.reduce((a, b) => a + b, 0);
      console.log(newSum);
    } catch {}

    return newSum;
  }

  function filterDays(timers, dayers) {
    let result = timers.filter((sheet) => sheet.dayName === dayers);
    if (result.length > 0) {
      return (
        <div
          key={dayers}
          role="button"
          onClick={(event) => sheetSelected(event)}
          propy={result[0].dateNumber}
          className="ts-r"
        >
          <div className="left-b">
            {capitalizeFirstLetter(result[0].dayName)}
            <div className="mm-dd">
              {ordinal_suffix_of(result[0].dayNumber)}
            </div>
          </div>
          <div className="right-b">
            {makeIsoReadable(result[0].punch[0])} -{" "}
            {makeIsoReadable(timeSheetLastHour(result[0].punch))}
            <div className="hh-mm">{result[0].total_hours}</div>
          </div>
        </div>
      );
    }
    return (
      <div
        role="button"
        onClick={(event) => console.log(event)}
        className="ts-r"
      >
        <div className="left-b">
          {capitalizeFirstLetter(dayers)}
          <div className="mm-dd">00</div>
        </div>
        <div className="right-b">
          0000 AM - 0000 PM
          <div className="hh-mm">00:00:00</div>
        </div>
      </div>
    );
  }

  return (
    <div className="view-ts-page">
      <Link to="/viewdetailedts">
        <button variant="outline-warning">Detail View</button>
      </Link>
      <div className="vts-cont" id="mc">
        <div className="vts-d-b" id="b-top">
          <button
            onClick={(e) => TsLeftArrowButton()}
            className="ts-left-arrow-button"
          >
            LB
          </button>
          <h2 className="month">{monthName}</h2>
          <h3 className="day">{ordinal_suffix_of(dayNumber)}</h3>
          <button
            onClick={() => window.location.reload(false)}
            className="ts-right-arrow-button"
          >
            RB
          </button>
        </div>

        <div className="ts-cont" id="ts-b">
          <div className="ts-h"></div>

          {/* Object.values(timeSheets).map((value) => (
           <SheetInfo
           key={value.dayName}
           value={value}
           callback={callbackFunction}
          />
          
  )) */}

          {daysOfWeek.map((days) => filterDays(timeSheets, days))}

          <footer className="ts-f">
            <div className="weekly-total">
              {timeSheets.map((x) => WeeklyHourTotal(x.total_hours))}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
