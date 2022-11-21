import React from 'react'
import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import { createTimeSheetEntrys } from "../../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { secure } from "../../../Secret";

export default function EditTSModal({ ...props }) {
  let currentTSSheetID = props.sheetID;
  let currentTSSheetPin = props.pin;
  let editTSSetTrigger = props.setTrigger;
  
let [TSStartValue, setTSStartValue] = useState("10:00")
let [TSEndValue, setTSEndValue] = useState("12:00")



    return props.trigger ? (
    <div className="modal-background">
    <div className="modal-container">
    <label>Start Time:</label>
    <TimePicker
    clearIcon={null}
    disableClock={true}
    onChange={setTSStartValue}
    value={TSStartValue}
  />
  <br />
  <label>End Time:</label>
    <TimePicker
    clearIcon={null}
    disableClock={true}
    onChange={setTSEndValue}
    value={TSEndValue}
  />
    </div>
  </div>
) : (
  ""
);
}
