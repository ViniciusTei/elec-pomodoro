import { createAudioElement } from "./audio";

const labels = ['Hora de focar 😎', 'Hora de descansar 😴']
let currentLabelIndex = 0;
let currMinute = 25;
let currSec = 0;
let interval: NodeJS.Timeout;
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
  document.getElementById('info-label')!.innerHTML = labels[currentLabelIndex]
  
}

function injectBtnLabels() {
  const btnStart = document.getElementById('btn-start')
  const btnStop = document.getElementById('btn-stop')
  if(onStart) {
    btnStart!.innerHTML = 'Pausar'
    btnStop!.innerHTML = 'Parar'
  } else {
    btnStart!.innerHTML = 'Start'
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
      decreaseTime(currentLabelIndex, !onStart)
      injectTime()
      injectBtnLabels()
    }, 1000)
  } else {
    clearInterval(interval)
    injectTime()
    injectBtnLabels()
  }
}

function decreaseTime(currIndex: number, alarm?: boolean) {
  if(currSec == 0 && currMinute == 0) {
    if(currIndex == 0) {
      // seta hora de descansar
      // deve ativar o alarme
      currentLabelIndex = 1
      currMinute = defaultRest
      currSec = 0

      injectLabel()
      if(alarm) {
        const div = document.getElementsByClassName('time')
        const audio = createAudioElement()
        div[0].appendChild(audio)
      }
      
    } else {
      // seta hora de focar
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

document.getElementById('config')?.addEventListener('click', () => toggleModal())

function toggleModal() {
  document.getElementById('modal')!.style.display = isModalOpen ? 'none' : 'block' 
  isModalOpen = !isModalOpen
  if(isModalOpen) {
    const modalButton = <HTMLButtonElement> document.getElementById('modal-btn')
    const inputFoco = <HTMLInputElement> document.getElementById("foco");
    const inputDescanso = <HTMLInputElement> document.getElementById("descanso");
    modalButton!.disabled = false
    inputFoco!.value = defaultFocus.toString()
    inputDescanso!.value = defaultRest.toString()
  }
}

document.getElementById('modal-btn')!.addEventListener('click', () => {
  const inputFoco = <HTMLInputElement> document.getElementById("foco");
  const inputDescanso = <HTMLInputElement> document.getElementById("descanso");
  const modalButton = <HTMLButtonElement> document.getElementById('modal-btn')
  defaultFocus = Number(inputFoco!.value)
  defaultRest = Number(inputDescanso!.value)
  currMinute = defaultFocus
  currentLabelIndex = 0
  modalButton!.innerHTML = '...'
  setTimeout(() => {
    modalButton!.innerHTML = 'Salvo'
    modalButton!.disabled = true
  }, 1000)
})