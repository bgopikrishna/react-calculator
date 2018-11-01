import React from "react";

import { numPad, mathOperators } from "../constants/constants";
import Button from "./buttons";

const Pad = ({
  handleNumber,
  handleClear,
  handleEquals,
  handleZero,
  handleDecimal,
  handleOperator
}) => {
  return (
    <div className="pad">
      <div className="equal-clear">
        <Button onClick={handleClear} id={"clear"}>
          {"AC"}
        </Button>
        <Button onClick={handleEquals} id={"equals"}>
          {"="}
        </Button>
      </div>
      <div className="numpad">
        {numPad.map(item => {
          return (
            <Button key={item.id} onClick={handleNumber} id={item.id}>
              {item.value}
            </Button>
          );
        })}
        <Button onClick={handleZero} id={"zero"}>
          {"0"}
        </Button>
        <Button onClick={handleDecimal} id={"decimal"}>
          {"."}
        </Button>
      </div>

      <div className="logic">
        {mathOperators.map(item => {
          return (
            <Button key={item.id} onClick={handleOperator} id={item.id}>
              {item.value}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Pad;
