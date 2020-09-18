// 🔄 A simple "for" loop ----------------------------------------

// "i" is the counting variable.
// With "var i = 0;" the variable "i" is set and the start value "0" for the loop is defined.
// With "i <= 9" it is defined that the loop stops when "i" has reached the value "9". 
// At the third position, "i++" determines that the current number of "i" is increased by one with each pass.
// These settings allow for 10 loop runs (counting starts with "0", not with "1").
// Good to know: "i++" is the short form of "i = i+1" 😉

for (var i = 0; i <= 9; i++) {
  console.log('🔴 Loop 1, counting variable: ' + i);
}

// Further examples ----------------------------------------
//
// Loop 2, adding another counting variable

var anotherCounter = 0;

for (var i = 0; i <= 9; i++) {
  anotherCounter++;
  console.log('🟢 Loop 2, counting variable: ' + i);
  console.log('🟢 Loop 2, another counter: ' + anotherCounter);
}

// Loop 3, stop if the other variable has reached a certain value

var anotherCounter = 12;

for (var i = 0; i <= 9; i++) {
  anotherCounter++;
  console.log('🟣 Loop 3, counting variable: ' + i);
  console.log('🟣 Loop 3, another counter: ' + anotherCounter);
  if (anotherCounter == 15) {
    break;
  }
}