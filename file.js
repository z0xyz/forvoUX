// ==UserScript==
// @name         forvo
// @version      0.1
// @description  Auto pronounce as soon as the forvo page loads .
// @author       z0xyz
// @match        https://*forvo.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-end
// @namespace https://greasyfork.org/users/813029
// ==/UserScript==
 
try {
    try {
        document.getElementsByClassName("word-play-list-icon-size-l").item(0).getElementsByClassName("play").item(0).click()
    }
    catch {
        document.getElementsByClassName("word-play-list-icon-size-l").item(1).childNodes.item(1).firstElementChild.click()
    }
}catch {
    document.getElementById("navLangItem-en").firstElementChild.click()
}
 
function keypressCheck(keypressEvent){
    switch (keypressEvent.key) {
        case ("R"):
            document.getElementsByClassName("word-play-list-icon-size-l").item(0).getElementsByClassName("play").item(0).click()
            break
        case ("!"):
            document.getElementsByClassName("word-play-list-icon-size-l").item(1).childNodes.item(1).firstElementChild.click()
            break
        case ("@"):
            document.getElementsByClassName("word-play-list-icon-size-l").item(1).childNodes.item(3).firstElementChild.click()
            break
        case ("#"):
            document.getElementsByClassName("word-play-list-icon-size-l").item(1).childNodes.item(5).firstElementChild.click()
            break
        case ("$"):
            document.getElementsByClassName("word-play-list-icon-size-l").item(1).childNodes.item(7).firstElementChild.click()
            break
    }
}
 
window.addEventListener("keypress",keypressCheck,false)
