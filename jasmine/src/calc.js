var Calculator = function() {
  var numStack = [],
  opStack = [],

  calculate = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y
  },

  processOperand = function(e) {
    console.log('target', e.target);
    console.log(this);
    console.log($(this));
  }

  return {
    processOperand: processOperand
  }
};

window.onload = function() {
  $('#c').hide(); //AC and C are the same button; they toggle visiblity

  var calc = Calculator();

  // Event handlers
  $('.operand').on('click', calc.processOperand);

}
