import React from "react";

const Display = ({ output, expression, userInput }) => {
  return (
    <div className="display">
      <div id="display" className="output">
        {expression ? expression : "0"}
      </div>
      <div className="input">{userInput ? userInput : "0"}</div>
    </div>
  );
};

export default Display;
