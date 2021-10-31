// ==UserScript==
// @name         forvo
// @version      0.5
// @description  Auto pronounce as soon as the forvo page loads .
// @author       z0xyz
// @match        https://*forvo.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-end
// @namespace https://greasyfork.org/users/813029
// ==/UserScript==

let recordingsNumber = document.getElementsByClassName("play").length
let previousPlacement = 0
let currentPlacement = 0

function playInitialSound(){
    try {
        document.getElementsByClassName("play").item(0).click()
    }catch {
        document.getElementById("navLangItem-en").firstElementChild.click()
    }
}

playInitialSound()

function playSound(){
    document.getElementsByClassName("play").item(currentPlacement).click()
}

function recordingHighlight(movementValue){
    currentPlacement += movementValue
    previousPlacement = currentPlacement - movementValue
    //The following 3 conditional statements alters the default received movementValue at certain recording placements , in order to improve usability .
    //the variable previousPlacement used within them is used to merely reset the currentPlacement back to its value //before the previous movement , 
    //but logically it has nothing to do with previousPlacement in its own right .
    if ( previousPlacement == 1 && movementValue == -2 ) {
        currentPlacement = previousPlacement - 1
    }else if ( previousPlacement == 0 && movementValue == +2 ) {
        currentPlacement = previousPlacement + 1
    }else if ( recordingsNumber % 2 == 0 && previousPlacement == recordingsNumber - 2 && movementValue == +2 ){
        currentPlacement = previousPlacement + 1
    }
    if ( currentPlacement >= 0 && currentPlacement < recordingsNumber ) {
        document.getElementsByClassName("play").item(previousPlacement).style = ""
        document.getElementsByClassName("play").item(currentPlacement).style = "border:solid thin lightblue; border-radius:3px; background-color:#d8d8d8"
    }else {
        currentPlacement -= movementValue
    }
}

function keypressCheck(keypressEvent){
    if (document.activeElement != document.getElementById("word_search_header")) {
        keypressEvent.returnValue = false;
        switch (keypressEvent.code) {
            case ("Space"):
                playSound()
                break
            case ("KeyW"):
                recordingHighlight(-2)
                break
            case ("KeyS"):
                recordingHighlight(2)
                break
            case ("KeyD"):
                recordingHighlight(1)
                break
            case ("KeyA"):
                recordingHighlight(-1)
                break
        }
        (function searchBoxFunctionality(){
            if (keypressEvent.shiftKey && keypressEvent.code == "KeyQ") {
                document.getElementById("word_search_header").value = ""
                document.getElementById("word_search_header").focus()
            }else if (keypressEvent.code == "KeyQ"){
                document.getElementById("word_search_header").focus()
            }
        }())
    }
}

window.addEventListener("keydown",keypressCheck,false)
