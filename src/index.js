const labels = ['Hora de focar 😎', 'Hora de descansar 😴']
let currentLabelIndex = 0;
let currMinute = 25;
let currSec = 0;
let interval = 0;

function injectTime() {
  const div = document.getElementsByClassName('time')
  if(div.length > 0) {
    let label = `${currMinute}:${currSec}`
    div[0].innerHTML = label
  }
}

function onZerar() {
  clearInterval(interval)
  currMinute = 25;
  currSec = 0;
  injectTime()
}

function onStart() {
  interval = setInterval(() => {
    decreaseTime(currentLabelIndex)
    injectTime()
  }, 1000)
}

function decreaseTime(currIndex) {
  if(currSec == 0 && currMinute == 0) {
    if(currIndex == 0) {
      currentLabelIndex = 1
      currMinute = 5
      currSec = 0
    } else {
      currentLabelIndex = 0
      currMinute = 25
      currSec = 0
    }
  }
  if(currSec == 0 && currMinute > 0) {
    currSec = 59
    currMinute = currMinute - 1
  } else {
    currSec = currSec - 1
  }
}