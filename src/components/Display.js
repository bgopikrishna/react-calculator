import React from "react";

const Display = ({ output, userInput }) => {
   
  return (
    <div className="display">
      <div id="display" className="output">{output}</div>
      <div className="input">{userInput ? userInput : "0"}</div>
    </div>
  );
};

export default Display;
