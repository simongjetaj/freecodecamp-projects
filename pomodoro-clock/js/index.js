const minBreakBtn    = getById("minBreakBtn");
const plusBreakBtn   = getById("plusBreakBtn");
const minSessionBtn  = getById("minSessionBtn");
const plusSessionBtn = getById("plusSessionBtn");
const quote          = getById("quote");
const startBtn       = getById("start");
const clock          = getById("clock");
const resetBtn       = getById("reset");
const progress       = getById("progress");

let breakNum   = parseInt(getById("breakNum").textContent);
let sessionNum = parseInt(getById("sessionNum").textContent);

minBreakBtn.addEventListener("click", () => {
  if(breakNum > 1) {
    getById("breakNum").textContent = --breakNum;
  }
});

plusBreakBtn.addEventListener("click", () => {
    if(breakNum < 60) {
      getById("breakNum").textContent = ++breakNum;
    }
});

minSessionBtn.addEventListener("click", () => {
  if(sessionNum > 1) {
    getById("sessionNum").textContent = --sessionNum;
    addingZero();
  }
});

plusSessionBtn.addEventListener("click", () => {
  if(sessionNum < 60) {
    getById("sessionNum").textContent = ++sessionNum;
    addingZero(); 
  }
});

function addingZero() {
  if(sessionNum < 10) {
    getById("clock").textContent = `${sessionNum}:00`;
  } else {
    getById("clock").textContent = `${sessionNum}:00`;
  }
}

startBtn.addEventListener("click", () => {
  sessionNum *= 60;
  breakNum   *= 60;
  
  minBreakBtn.disabled    = true;
  plusBreakBtn.disabled   = true;
  minSessionBtn.disabled  = true;
  plusSessionBtn.disabled = true;
  
  quote.textContent = '"If you want it, work for it."';
  
  let sessInterval = setInterval(startSession, 1000);
  
  function startSession() {
    progress.style.width = `${sessionNum/60}%`;
    progress.style.backgroundColor = "#4CAF50";
    
    if(sessionNum === 0) {
      clearInterval(sessInterval);
      let breakInterval = setInterval(startBreak, 1000);
    }
    
    minsAndSecFormat(sessionNum);
    sessionNum--;
    
    function startBreak() {
      progress.style.width = `${breakNum/60}%`;
      progress.style.backgroundColor = "#F44336";
      
      quote.textContent = '"Take a coffee break, you deserve it."';
      if(breakNum === -1) {
        clearInterval(breakInterval);
      }
      
      minsAndSecFormat(breakNum);
      breakNum--;
    }
  }
  startBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  window.location.reload(true);
});

function minsAndSecFormat(num) {
  if(num%60 >= 10) {
    clock.textContent = Math.floor(num/60) + ":" + num%60;
  } else {
    clock.textContent = Math.floor(num/60) + ":" + "0" + num%60;
  }
}

function getById(element) {
  return document.getElementById(element);
}