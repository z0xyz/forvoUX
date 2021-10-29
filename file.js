// ==UserScript==
// @name         forvo
// @version      0.3
// @description  Auto pronounce as soon as the forvo page loads .
// @author       z0xyz
// @match        https://*forvo.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-end
// @namespace https://greasyfork.org/users/813029
// ==/UserScript==

let recordings_number = document.getElementsByClassName("play").length
let initial_placement = 0
let new_placement = 0

function highlight_item(movement_value){
    new_placement += movement_value
    if ( new_placement >= 0 && new_placement <= recordings_number ) {
        console.log(new_placement)
        document.getElementsByClassName("play").item(new_placement).style = "border:solid thin lightblue; border-radius:3px; background-color:#d8d8d8"
    }else {
        new_placement -= movement_value
    }
}

function play_initial_sound(){
    document.getElementsByClassName("word-play-list-icon-size-l").item(0).getElementsByTagName("li").item(0).getElementsByClassName("play").item(0).click()
}

function play_additional_sound(recordingNumber){
    let exactWordPassage = document.getElementsByClassName("results_match").item(0)
    function playSound(recordingNumber,categoryNumber){
        document.getElementsByClassName("word-play-list-icon-size-l").item(categoryNumber).getElementsByTagName("li").item(recordingNumber).getElementsByClassName("play").item(0).click()
    }
    if (exactWordPassage == null){
        playSound(recordingNumber,0)
    }else {
        playSound(recordingNumber,1)
    }
}

try {
    try {
        play_initial_sound(0,0)
    }
    catch {
        play_additional_sound(1,1)
    }
}catch {
    document.getElementById("navLangItem-en").firstElementChild.click()
}

function keypressCheck(keypressEvent){
    if (document.activeElement != document.getElementById("word_search_header")) {
        keypressEvent.returnValue = false;
        switch (keypressEvent.code) {
            case ("Space"):
                play_initial_sound()
                break
            case ("Digit1"):
                play_additional_sound(0)
                break
            case ("Digit2"):
                play_additional_sound(1)
                break
            case ("Digit3"):
                play_additional_sound(2)
                break
            case ("Digit4"):
                play_additional_sound(3)
                break
            case ("ArrowUp"):
                highlight_item(-2)
                break
            case ("ArrowDown"):
                highlight_item(2)
                break
            case ("ArrowRight"):
                highlight_item(1)
                break
            case ("ArrowLeft"):
                highlight_item(-1)
                break
        }
        (function searchBoxFunctionality(){
            if (keypressEvent.shiftKey && keypressEvent.code == "KeyS") {
                document.getElementById("word_search_header").value = ""
                document.getElementById("word_search_header").focus()
            }else if (keypressEvent.code == "KeyS"){
                document.getElementById("word_search_header").focus()
            }
        }())
    }
}

window.addEventListener("keydown",keypressCheck,false)
