var Calculator = function() {
  var numStack = [],
  opStack = [],

  calculate = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y;
  },

  processOperand = function(e) {
    console.log(e);
  }
};

  return {
    calculate: calculate;
    processOperand: processOperand
  }
}

window.onloadfunction() {
  Calculator();

  // Event handlers
  $('.operand').on('click', processOperand);
}
