import React, { useState, } from "react";
import "./ClockinModal.style.css";

function ClockInModal(props) {
  let d = new Date();
  let n = d.toLocaleTimeString();



  return props.trigger ? (
    <div className="modal-background">
      <div className="modal-container">
      <div className="modal-container-content">
        {props.children}
        <h4 className="modal-text">Hello <br/>{props.name}! <br/>Clocked in At {n}</h4><br/>
        <h1 className="modal-time"></h1>
        <h1 className="pinner"></h1>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ClockInModal;
