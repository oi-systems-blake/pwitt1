import React from "react";

export default function AddEntryModal({ ...props }) {
  return props.trigger ? (
    <div className="modal-background">
      <div className="modal-container">
        <h1 className="tdv-aem-header">Add Time Sheet Entry</h1>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}
