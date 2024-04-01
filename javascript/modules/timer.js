import state from "./state.js"
import * as el from './elements.js'
import { toggleReset } from './actions.js'

export function countdown(){

    clearTimeout(state.countdownId)

    if(!state.isRunning) {
        return
    }

    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    seconds--

    if(seconds < 0) {
        seconds = 59
        minutes--
    }

    if (minutes < 0) {
        toggleReset()
        return
    }

    updateDisplay(minutes, seconds)

    state.countdownId = setTimeout(() => countdown(), 1000)

}



export function updateDisplay(minutes, seconds){
//coaleasing operation
    minutes = minutes ?? state.minutes
    seconds = seconds ?? state.seconds


    el.minutes.textContent = String(minutes).padStart(2, "0") 
    el.seconds.textContent = String(seconds).padStart(2, "0")
//convert the data to string and tells that the data need to have two characteres if not  add a 0
}