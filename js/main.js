$(document).ready(function(){
  $("#c").hide(); //AC and C are the same button; they toggle visiblity

  var numFlag = false;
  var percentFlag = false;
  var tempOpStack = []; //the last non-equals operator entered
  var tempNumStack = []; //numbers under contstruction in the display
  var opStack = []; //operands (including equals)
  var numStack = []; //complete numbers
  var omniStack = []; //all primary buttons that have been pressed, including equals
  var operators = {
    "+": function(a, b) {return a + b},
    "-": function(a, b) {return a - b},
    "*": function(a, b) {return a * b},
    "/": function(a, b) {return a / b}
  }


  var pushNumber = function() {
    var num = $(this).data("number");
    numFlag = true;
    showC();
    clearBorder();
    clearTempNumStack();
    addToTempNum(num);
    displayTemp(tempNumStack);
  }

  var pushOperand = function() {
    var op = $(this).data("operand");
    addToNum(tempNumStack);
    addToOmni(numStack[0]);
    addToTempOp(op);
    addToOp(op);
    addToOmni(op);
    addBorder($(this));
    doOpEquals(); //Default operations
    doEqualsEquals(); //Equals button is pressed repeatedly
    //doChainOperands();
    //doChangeOperands();
    //doPrematureEquals();
  }


  //Secondary button functions
  var pushAllClear = function(){
    clearTempNumStack("AC");
    clearNumStack();
    clearOpStack();
    clearOmniStack();
    clearBorder();
  }

  var pushClear = function() {
    clearTempNumStack("C");
    showAC();
    displayZero();
  }

  var pushPlusMinus = function(){
    //If tempNumStack is positive...
    if (tempNumStack[0] !== "-") {
      tempNumStack.unshift("-");
      displayTemp(tempNumStack);
      //If tempNumStack is negative...
    } else {
      tempNumStack.shift();
      displayTemp(tempNumStack);
    }
  }

  //Future feature
  /*
  var pushPercent = function(){
    if (numFlag) {

    } else if () {
    } else {
      //Multiply the stack by .01 and update the display
      var temp = Number(tempNumStac.join(""));
      temp /= 100;
      displayTemp();

    }
  }
  */


  /*FUNCTIONS NOT DIRECTLY LINKED TO A BUTTON ON THE CALCULATOR INTERFACE*/

  //CLEAR functions
  var clearTempNumStack = function(trigger) {
    //C and AC send a trigger to bypass the length requirement
    if (trigger) {
      tempNumStack = [];
    }
    //Clear the stack after an operator is used
    if (omniStack.length > 0) {
      if (isNaN(omniStack[0])) {
        if (omniStack[0] !== ".") {
          tempNumStack = [];
          return;
        }
      }
    }
    //Clear the stack after equals is used
    if (opStack[0] === "=") {
      tempNumStack = [];
    }
  }

  var clearNumStack = function() {
    numStack = [];
  }

  var clearTempOpStack = function () {
    tempOpStack = "";
  }

  var clearOpStack = function() {
    opStack = [];
  }

  var clearOmniStack = function() {
    omniStack = [];
  }

  //DISPLAY functions
  var displayTemp = function(arr) {
    if (arr[0] === ".") {
      arr.unshift(0);
    }
    $("#display").html(arr.join(""));
  }

  var displayZero = function() {
    $("#display").html(0);
  }

  var displayNum = function(arr) {
    $("#display").html(arr[0]);
  }

  //ADD functions
  var addToTempOp = function(operand) {
    if (operand !== "=") {
      tempOpStack.unshift(operand);
    }
  }

  var addToTempNum = function(number) {
    tempNumStack.push(number);
  }

  var addToOp = function(operand) {
    opStack.unshift(operand);
  }

  var addToNum = function(arr) {
    if (numFlag) {
      numStack.unshift(Number(tempNumStack.join("")));
    }
  }

  var addToOmni = function(button) {
    omniStack.unshift(button);
  }

  //DO functions
  var doOpEquals = function() {
    if (omniStack[0] === "=" && opStack[1] !== "=") {
      numFlag = false;
      var result = operators[opStack[1]](numStack[1], numStack[0]);
      numStack.unshift(result);
      omniStack.unshift(result);
      displayNum(numStack);
    }
  }

  var doEqualsEquals = function() {
    if (omniStack[0] === "=" && opStack[1] === "=") {
      numFlag = false;
      var lastNum = Number(tempNumStack.join(""));
      var result = operators[tempOpStack[0]](numStack[0], lastNum);
      numStack.unshift(result);
      omniStack.unshift(result);
      displayNum(numStack);
    }
  }

  //Appearance-related functions
  var showAC = function() {
    $("#ac").show();
    $("#c").hide();
  }

  var showC = function() {
    $("#c").show();
    $("#ac").hide();
  }

  var addBorder = function(button) {
    clearBorder();
    if ($(button).data("operand") !== "=") {
      $(button).addClass("border");
    }
  }

  var clearBorder = function() {
    $(".operand").removeClass("border");
  }

  $(".gray").mousedown(function() {
    $(this).toggleClass("darkgray");
  });
  $(".gray").mouseup(function() {
    $(this).toggleClass("darkgray");
  });
  $(".orange").mousedown(function() {
    $(this).toggleClass("darkorange");
  });
  $(".orange").mouseup(function() {
    $(this).toggleClass("darkorange");
  });

  //Event triggers
  $(".number").mouseup(pushNumber);
  $(".operand").mouseup(pushOperand);
  $("#plusMinus").mouseup(pushPlusMinus);
  //$("#percent").mouseup(pushPercent);
  $("#ac").mouseup(pushAllClear);
  $("#c").mouseup(pushClear);
});
