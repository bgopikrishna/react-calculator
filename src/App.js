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

    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
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

  handleClear(value) {
    this.setState({
      expression: "",
      output: "0",
      userInput: "",
      hasError: false
    });
  }
  handleEquals(value) {
    let { expression, userInput } = this.state;

    if (endsWithOperator.test(expression)) expression = expression.slice(0, -1);

    expression = expression.replace(/x/g, "*").replace(/‑/g, "-");

    let result = math.eval(expression);
    result = Math.round(1000000000000 * result) / 1000000000000;
    expression = escapeRegExp(expression);
    this.setState({
      output: result,
      userInput: result.toString()
    });
  }
  handleDecimal(value) {
    let { expression } = this.state;
    expression += value;
    const regDec = /.+/g;
    expression = expression.replace(regDec, ".");
    console.log(expression);
    this.setState({
      expression: expression,
      output: expression,
      userInput: value
    });
  }
  handleZero(value) {}

  handleOperator(value) {
    let { expression } = this.state;
    this.setState({
      prevOperator: value,
    })

    if (endsWithOperator.test(expression)) {
      const sameOperator =
       this.state.prevOperator === value ? true : false;
      if (!sameOperator) {
        expression = expression.split(" ");
        expression[expression.length - 1] = value;
        expression = expression.join("");
        console.log(expression)
        this.setState({
          expression: expression,
          output: expression,
          userInput: value
        });
      }
    } else {
      expression += value;
      this.setState({
        expression: expression,
        output: expression,
        userInput: value
      });
    }
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }

  render() {
    const { expression, output, userInput, hasError } = this.state;

    return (
      <div className="App">
        {!hasError ? (
          <div className="calc">
            <Display output={output} userInput={userInput} />
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

// const isOperator = c => {
//   if (c === "+" || c === "-" || c === "x" || c === "/") {
//     return true;
//   } else {
//     return false;
//   }
// };
const endsWithOperator = /[x+‑/]$/;
const isOperator = /[x/+‑]/;
