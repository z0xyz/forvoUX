// ==UserScript==
// @name         forvo
// @version      0.6
// @description  Auto pronounce as soon as the forvo page loads .
// @author       z0xyz
// @match        https://*forvo.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-end
// @namespace    https://greasyfork.org/users/813029
// ==/UserScript==

try {
    var recordingsNumber = document.getElementsByClassName("play").length
    var firstSeparateRecording = document.getElementsByClassName("results_match").item(0)
}catch {
    console.log('The document is devoid of recordings!')
}
let previousPlacement
let currentPlacement

function playInitialSound(){
    try {
        document.getElementsByClassName("play").item(0).click()
    }catch {
        try {
            document.getElementById("navLangItem-en").firstElementChild.click()
        }catch {
            console.log('The document is devoid of recordings!')
        }
    }
}
playInitialSound()

function playSound(){
    document.getElementsByClassName("play").item(currentPlacement).click()
}

function recordingHighlight(movementValue){
    currentPlacement += movementValue
    previousPlacement = currentPlacement - movementValue
    //The following 2 if&else if conditional statements alters the default received movementValue at certain recording placements , in order to improve usability .
    //the variable previousPlacement used within them is used to merely reset the currentPlacement back to its value //before the previous movement ,
    //but logically it has nothing to do with previousPlacement in its own right .
    if ( firstSeparateRecording != null ) {
        if ( previousPlacement == 1 && movementValue == -2 ) {
            currentPlacement = previousPlacement - 1
        }else if ( previousPlacement == 0 && movementValue == +2 ) {
            currentPlacement = previousPlacement + 1
        }else if ( recordingsNumber % 2 == 0 && previousPlacement == recordingsNumber - 2 && movementValue == +2 ){
            currentPlacement = previousPlacement + 1
        }
    }else if ( firstSeparateRecording == null ) {
        if ( recordingsNumber % 2 == 0 && currentPlacement.toString() == NaN.toString() && movementValue == +2 ){
            previousPlacement = 0
            currentPlacement = 0
        }
        if ( recordingsNumber % 2 != 0 && previousPlacement == recordingsNumber - 2 && movementValue == +2 ){
            currentPlacement = previousPlacement + 1
        }
    }
    if ( currentPlacement >= 0 && currentPlacement < recordingsNumber ) {
        (function highlightElement (){
            document.getElementsByClassName("play").item(previousPlacement).style = ""
            document.getElementsByClassName("play").item(currentPlacement).style = "border:solid thin lightblue; border-radius:3px; background-color:#d8d8d8"
        }())
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
            if (keypressEvent.shiftKey && keypressEvent.key == "Q") {
                document.getElementById("word_search_header").value = ""
                document.getElementById("word_search_header").focus()
            }else if (keypressEvent.key == "q"){
                document.getElementById("word_search_header").focus()
            }
        }())
    }
}

window.addEventListener("keydown",keypressCheck,false)
