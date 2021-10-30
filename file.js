// ==UserScript==
// @name         forvo
// @version      0.4
// @description  Auto pronounce as soon as the forvo page loads .
// @author       z0xyz
// @match        https://*forvo.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-end
// @namespace https://greasyfork.org/users/813029
// ==/UserScript==

let recordings_number = document.getElementsByClassName("play").length
let initial_placement = 0
let previous_placement = 0
let current_placement = 0

function playInitialSound(){
    try {
        document.getElementsByClassName("play").item(0).click()
    }catch {
        document.getElementById("navLangItem-en").firstElementChild.click()
    }
}

playInitialSound()

function playSound(){
    document.getElementsByClassName("play").item(current_placement).click()
}

function recordingHighlight(movement_value){
    current_placement += movement_value
    if ( current_placement >= 0 && current_placement < recordings_number ) {
        console.log(current_placement)
        previous_placement = current_placement - movement_value
        document.getElementsByClassName("play").item(previous_placement).style = ""
        document.getElementsByClassName("play").item(current_placement).style = "border:solid thin lightblue; border-radius:3px; background-color:#d8d8d8"
    }else {
        current_placement -= movement_value
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
