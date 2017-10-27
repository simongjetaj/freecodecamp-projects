const calcs = getElementById("calculations");

// turning the calculator on :)
function on() {
  // for each input we remove the attribute disabled
  const inputs = document.querySelectorAll("input[type='button']");
  inputs.forEach(input => {
    input.disabled = false; 
  });
  getElementById("screenZone").style.backgroundColor = "#fff";
  calcs.classList.add("underscore"); // adding the underscore to indicate that user's calculations should go there
  calcs.textContent = "";
  getElementById("result").textContent = "0";
}

function addToScreenZone(x) {
  let exp = calcs.textContent;
  calcs.textContent += x; // when we click the buttons the argument value will be displayed on the screen
  
  // square root code
  let sqrtIndex = exp.indexOf('√'); 
  if(sqrtIndex != -1) {
    let num = parseInt(calcs.textContent.slice(sqrtIndex+1)); // not including the sqrt symbol to the string and then parsing it into an integer
    getElementById("result").textContent = Math.sqrt(num);
  }
  
  // power code :)
  let powerIndex = exp.indexOf('^'); 
  if(powerIndex != -1) {
    let firstNum = parseInt(calcs.textContent.substr(0, powerIndex+1));
    let secNum = parseInt(calcs.textContent.substr(powerIndex+1)); 
    getElementById("result").textContent = firstNum**secNum; // ECMAScript 2017 (ES8) 
  }
  
  // after using the Math methods we round to at most 2 decimal places (only if necessary)
  // log code
  let logIndex = exp.indexOf('log'); 
  if(logIndex != -1) {
    let logNum = parseInt(calcs.textContent.substr(logIndex+3));  
    getElementById("result").textContent = Math.round(Math.log10(logNum)*100)/100; 
  }
  
  // ln code
  let lnIndex = exp.indexOf('ln'); 
  if(lnIndex != -1) {
    let lnNum = parseInt(calcs.textContent.substr(lnIndex+2));
    getElementById("result").textContent = Math.round(Math.log(lnNum)*100)/100;
  }
  
  // sin code
  let sinIndex = exp.indexOf('sin'); 
  if(sinIndex != -1) {
    let sinNum = parseInt(calcs.textContent.substr(sinIndex+3));
    getElementById("result").textContent = Math.round(Math.sin(sinNum * Math.PI / 180.0)*100)/100; // Math.sin expects the input to be in radian, we need to convert it
  }
  
  // cos code
  let cosIndex = exp.indexOf('cos'); 
  if(cosIndex != -1) {
    let cosNum = parseInt(calcs.textContent.substr(cosIndex+3));
    getElementById("result").textContent = Math.round(Math.cos(cosNum * Math.PI / 180.0)*100)/100; 
    // Math.cos expects the input to be in radian, we need to convert it
  }
  
  // tan code
  let tanIndex = exp.indexOf('tan'); 
  if(tanIndex != -1) {
    let tanNum = parseInt(calcs.textContent.substr(tanIndex+3));
    getElementById("result").textContent = Math.round(Math.tan(tanNum * Math.PI / 180.0)*100)/100; 
    // Math.tan expects the input to be in radian, we need to convert it
  }
  
  // if we press del button
  if(x === 'del') {
    let length = calcs.textContent.length - 4; // del.length is 3 + 1 character that would be deleted = 4 
    let newExp = exp.substr(0, length); 
    calcs.textContent = newExp;
  }
  
  // if we press ac button
  if(x === 'ac') {
    calcs.textContent = "";
    getElementById("result").textContent = "0";
  } 
}

function result() {
  const result = getElementById("result");
  let x = calcs.textContent;
  x = eval(x); // evaluating the string 
  result.textContent = Math.round(x*100)/100; // displaying the result 
}

function getElementById(str) {
  return document.getElementById(str);
}