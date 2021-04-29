const labels = ['Hora de focar 😎', 'Hora de descansar 😴']
let currentLabelIndex = 0;
let currMinute = 25;
let currSec = 0;
let interval = 0;
let onStart = false;
let isModalOpen = false;

//config variables
let defaultFocus = 25
let defaultRest = 5


onInit()

function onInit() {
  injectLabel()
  injectBtnLabels() 
}

function injectTime() {
  const div = document.getElementsByClassName('time')
  if(div.length > 0) {
    let label = `${currMinute}:${currSec}`
    div[0].innerHTML = label
  }
}

function injectLabel() {
  const label = document.getElementById('info-label')
  label.innerHTML = labels[currentLabelIndex]
}

function injectBtnLabels() {
  const btnStart = document.getElementById('btn-start')
  const btnStop = document.getElementById('btn-stop')
  if(onStart) {
    btnStart.innerHTML = 'Pausar'
    btnStop.innerHTML = 'Parar'
  } else {
    btnStart.innerHTML = 'Start'
  }
}

function handleZerar() {
  clearInterval(interval)
  currMinute = 25;
  currSec = 0;
  currentLabelIndex = 0
  injectTime()
  injectLabel()
  injectBtnLabels()
}

function handleStart() {
  onStart = !onStart
  if(onStart) {
    interval = setInterval(() => {
      decreaseTime(currentLabelIndex)
      injectTime()
      injectBtnLabels()
    }, 1000)
  } else {
    clearInterval(interval)
    injectTime()
    injectBtnLabels()
  }
}

function decreaseTime(currIndex) {
  if(currSec == 0 && currMinute == 0) {
    if(currIndex == 0) {
      currentLabelIndex = 1
      currMinute = defaultRest
      currSec = 0
      injectLabel()
    } else {
      currentLabelIndex = 0
      currMinute = defaultFocus
      currSec = 0
      injectLabel()
    }
  }
  if(currSec == 0 && currMinute > 0) {
    currSec = 59
    currMinute = currMinute - 1
  } else {
    currSec = currSec - 1
  }
}

document.getElementById('config').addEventListener('click', () => toggleModal())

function toggleModal() {
  document.getElementById('modal').style.display = isModalOpen ? 'none' : 'block' 
  isModalOpen = !isModalOpen
  if(isModalOpen) {
    document.getElementById('foco').value = defaultFocus
    document.getElementById('descanso').value = defaultRest
  }
}

document.getElementById('modal-btn').addEventListener('click', () => {
  defaultFocus = document.getElementById('foco').value
  defaultRest = document.getElementById('descanso').value
  currMinute = defaultFocus
  currentLabelIndex = 0
  document.getElementById('modal-btn').innerHTML = '...'
  setTimeout(() => {
    document.getElementById('modal-btn').innerHTML = 'Salvo'
    document.getElementById('modal-btn').disabled = true
  }, 1000)
})