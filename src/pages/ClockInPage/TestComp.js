import React from "react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { startOfDay } from 'date-fns'

export function TestComp() {
  let [time, setTime] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const month = format(time, "MMMM");
  const year = format(time, "yyyy");
  const dayNumber = format(time, "d");
  const dayName = format(time, "EEEE");
  const actualDate = format(time, "PPPP");
  const exactTime = format(time, "pp");

 

  let beginningOfDay = startOfDay(time)
  let beginningOfDayFormated = beginningOfDay.getTime()
  console.log(beginningOfDayFormated)
  return (
    <div>
    <h1>{time.toLocaleTimeString()}</h1>
    <h1>{beginningOfDayFormated}</h1>
      </div>
  );
}
