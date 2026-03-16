// mathUtils.js — a simple ES6 module
// This file is imported by main.js to demonstrate ES6 modules

// Named exports using arrow functions
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => {
  if (b === 0) return "Error: Can't divide by zero!";
  return a / b;
};

// A helper to describe the operation
export const describe = (op, a, b, result) =>
  `${a} ${op} ${b} = ${result}`;
