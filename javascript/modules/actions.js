import state from './state.js';
import * as timer from './timer.js';
import * as el from "./elements.js";
import * as sounds from "./sounds.js";
import * as events from "./events.js";


let currentPlayingAudio = null;



export function toggleRunning(){

    state.isRunning = document.documentElement.classList.toggle('running');
   
    timer.countdown()

}

export function toggleStop(){

    state.isRunning = document.documentElement.classList.remove('running');
   
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0;
    
    document.querySelectorAll('#mood button').forEach(button => {
        button.classList.remove('blue');
        });


}


export function toggleReset(){

        state.isRunning = false
        document.documentElement.classList.remove('running');
        timer.updateDisplay()
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;


        document.querySelectorAll('#mood button').forEach(button => {
        button.classList.remove('blue');
        });

        console.log("reset");
}


export function set() {
    el.minutes.setAttribute('contenteditable', true)
    el.minutes.focus()

    
}

export function toggleIncrease(){
    let minutesValue = parseInt(el.minutes.textContent, 10);

    if (isNaN(minutesValue)) {
        minutesValue = 0;
    }
    console.log("Current minutes:", minutesValue);
    minutesValue = minutesValue + 5; 
    el.minutes.textContent = minutesValue; // Update the DOM element to reflect the new value
}

export function toggleDecrease(){
    let minutesValue = parseInt(el.minutes.textContent, 10);

    if (isNaN(minutesValue)) {
        minutesValue = 0;
    }else if(minutesValue < 5){
        window.alert("The minimum value allow is 5 min")

      return
    }

    console.log("Current minutes:", minutesValue);
    minutesValue= minutesValue - 4;
    el.minutes.textContent = minutesValue; 
    

}

function highlightPlayingButton(playingButtonId) {
    // Reset all buttons to their default state
    document.querySelectorAll('#mood button').forEach(button => {
        button.classList.remove('blue');
    });

    // Highlight the button that is playing
    const playingButton = document.getElementById(playingButtonId);
    if (playingButton) {
        playingButton.classList.add('blue');
    }
}


export function playFireSounds(){

    highlightPlayingButton('fire');
    sounds.fireplace.play();

    console.log("Playing fire sounds");
}

export function playTreeSounds() {

    highlightPlayingButton('forest');
    sounds.forest.play();

    console.log("playing sounds of the trees")
}

export function playRainSounds() {

    highlightPlayingButton('rain');
    sounds.rain.play();

    console.log('Playing rain sounds');
}

export function playCitySounds() {

    highlightPlayingButton('store');
    sounds.coffeeShop.play();

    console.log('Playing city sounds');
}






export function playSound(action) {
    console.log(action); 
    
    if (currentPlayingAudio) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
    }

    if (action === "playTreeSounds" && state.isRunning == true) {

        currentPlayingAudio = sounds.forest;
        playTreeSounds();
        
        console.log("Playing tree sounds.");

    } else if (action === "playRainSounds" && state.isRunning == true) {
        
        currentPlayingAudio = sounds.rain;
        playRainSounds();
        
        console.log("Playing rain sounds.");
        
    } else if (action === "playFireSounds" && state.isRunning == true) {
        
        currentPlayingAudio = sounds.fireplace;
        playFireSounds();

        console.log("Playing fire sounds.");

    } else if (action === "playCitySounds" && state.isRunning == true) {

        currentPlayingAudio = sounds.coffeeShop;
        playCitySounds();
        
        console.log("Playing city sounds.");

    } else {
        console.log("Action not recognized or no sound function available for this action.");
    }

}







    

