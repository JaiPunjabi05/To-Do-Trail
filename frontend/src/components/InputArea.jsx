// React component having the text input and the add button

import React from "react";

function InputArea(props) {
  return (
    <div className="form">

      {/* text input  */}
      <input
        onChange={props.handleChange}
        type="text"
        value={props.inputText}
      />

      {/* Add button */}
      <button onClick={props.addItem}>
        <span className="addButton">Add</span>
      </button>
    </div>
  );
}

export default InputArea;
