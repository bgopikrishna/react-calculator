import React, { Component } from "react";
import "./App.css";
import * as math from "mathjs";
import Display from "./components/Display";
import Pad from "./components/pad";

class App extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        expression: "",
        output: "",
        userInput: "",
        prevOperator: false
      };
    }
    this.handleNumber = this.handleNumber.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);

    this.handleOperator = this.handleOperator.bind(this);

    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }
  handleNumber(value) {
    let { expression } = this.state;

    expression += value;

    this.setState({
      expression: expression,
      output: expression,
      userInput: value
    });
  }
  handleZero(value) {
    let { expression } = this.state;

    if (expression.indexOf(value) == 0 && expression.length < 2) {
      expression = value;
    } else {
      expression += value;
    }
    this.setState({
      expression: expression,
      output: expression,
      userInput: value
    });
  }
  handleDecimal(value) {
    let { expression } = this.state;
    let lastIndex = expression.lastIndexOf(".");
    let firstIndex = expression.indexOf(".");
    if (expression.indexOf(value) && expression.length < 1) {
      expression = expression + "0.";
    }
    // else if (
    //   lastIndex == firstIndex &&
    //   expression[expression.length - 1] !== "."
    // ) {
    //   expression += value;
    // }
    else if (!/\./.test(expression)) {
      expression += value;
    }
    this.setState({
      expression: expression,
      output: expression,
      userInput: value
    });
  }

  handleOperator(value) {
    let { expression } = this.state;
    let lastOperator = endsWithOperator.test(expression);

    if (lastOperator) {
      expression = expression.split("");

      expression[expression.length - 1] = value;

      expression = expression.join("");
    } else {
      expression += value;
    }

    this.setState({
      expression: expression,
      output: expression,
      userInput: value
    });
  }

  handleClear() {
    this.setState({
      expression: "",
      output: "0",
      userInput: "0"
    });
  }

  handleEquals() {
    let { expression } = this.state;
    expression = expression.replace(/x/g, "*").replace(/‑/g, "-");

    let result =
      Math.round(1000000000000 * math.eval(expression)) / 1000000000000;

    this.setState({
      expression: result,
      output: expression,
      userInput: result
    });
    console.log(expression, this.state.output, this.state.userInput);
  }

  render() {
    const { expression, output, userInput, hasError } = this.state;

    return (
      <div className="App">
        {!hasError ? (
          <div className="calc">
            <Display
              output={output}
              expression={expression}
              userInput={userInput}
            />
            <Pad
              handleNumber={this.handleNumber}
              handleClear={this.handleClear}
              handleEquals={this.handleEquals}
              handleZero={this.handleZero}
              handleDecimal={this.handleDecimal}
              handleOperator={this.handleOperator}
            />
          </div>
        ) : (
          <div>Error</div>
        )}
      </div>
    );
  }
}

export default App;

const escapeRegExp = string => string.replace(/[*|[]/g, "X");

const isOperator = c => {
  if (c === "+" || c === "-" || c === "x" || c === "/") {
    return true;
  } else {
    return false;
  }
};
const endsWithOperator = /[x+-/]$/;
