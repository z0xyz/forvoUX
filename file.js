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
 
function play_initial_sound(first_number,second_number){
    document.getElementsByClassName("word-play-list-icon-size-l").item(first_number).getElementsByClassName("play").item(second_number).click()
}
 
function play_additional_sound(first_number,second_number){
    document.getElementsByClassName("word-play-list-icon-size-l").item(first_number).childNodes.item(second_number).firstElementChild.click()
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
                play_initial_sound(0,0)
                break
            case ("Digit1"):
                play_additional_sound(1,1)
                break
            case ("Digit2"):
                play_additional_sound(1,3)
                break
            case ("Digit3"):
                play_additional_sound(1,5)
                break
            case ("Digit4"):
                play_additional_sound(1,7)
                break
        }
    }
}
 
window.addEventListener("keydown",keypressCheck,false)
