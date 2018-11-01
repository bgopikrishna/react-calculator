import React from "react";

const Button = props => {
  return (
    <button id={props.id} onClick={() => props.onClick(props.children)}>
      {props.children}
    </button>
  );
};

export default Button;


// handleClick(value) {
//     let { expression } = this.state;
//     if (isOperator(expression[expression.length - 1]))
//       if (!isOperator(value)) {
//         expression += value;
//         this.setState({
//           expression: expression,
//           output: expression,
//           userInput: value
//         });
//       }
//   }


// const isOperator = () => {
//     if (c === "+" || c === "+" || c === "x" || c === "/") {
//       return true;
//     } else return false;
//   };
  