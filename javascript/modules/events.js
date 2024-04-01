import {controls} from "./elements.js"
import * as actions from "./actions.js"
import state from "./state.js"
import * as el from "./elements.js"
import { updateDisplay } from "./timer.js"

export function registerControls(){

    controls.addEventListener('click',(event) => {
        const action = event.target.dataset.action
//dataset is used to get the value from the data action from each button
        if(typeof actions[action] != "function"){
            return
        }
        //console.log(actions.toggleRunning()) it is possible to call the object in two different ways this one and:
        // actions["toggleRunning"]() in the next line the name toggle running was changed to action because the const action is receiving the name of the property in the object. 
        actions[action]()
        console.log(action)
        console.log(event.target);
    })
   
}


export function playMoods(){

    const mood = document.getElementById('mood');
    mood.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        
        
            actions.playSound(action);
            console.log( action)


       


       
    });
   
}

playMoods();

export function setMinutes() {

    el.minutes.addEventListener('focus', () => {
       el.minutes.textContent = ""
    })
   
    el.minutes.onkeypress = (event) => /\d/.test(event.key)
   
    el.minutes.addEventListener('blur', (event) => {
       let time = event.currentTarget.textContent
   
       time = time > 60 ? 60 : time
   
       state.minutes = time
       state.seconds = 0
   
       updateDisplay()
       el.minutes.removeAttribute('contenteditable')
    })
}