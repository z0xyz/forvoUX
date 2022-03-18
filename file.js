// ==UserScript==
// @name         forvo
// @version      0.8.0
// @description  Auto pronounce as soon as the forvo page loads .
// @author       z0xyz
// @match        https://*forvo.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-end
// @namespace    https://greasyfork.org/users/813029
// ==/UserScript==

let recordingsLength = document.getElementsByClassName("play").length
let separateExactMatching = document.getElementsByClassName("results_match")
let activeElementIndex = 0

// This very part needs some refinement .. a serious one
if ( separateExactMatching.length == 0 ) {
	console.log("The document is devoid of recordings!");
}

(function playInitialSound() {
	let availableLanguagesUlItem = document.getElementsByClassName('nav_langs').item(0)
	// Check if there's any available languages on the document in the first place
	if ( availableLanguagesUlItem != null ) {
		let currentLanguageAvailableWords = document.getElementsByClassName('title_holder').item(0).getElementsByTagName('p').item(0).textContent.slice(0,1)
		if ( currentLanguageAvailableWords !== '0' ){
			// Play the first recording of the available accents
			
			// If there's no recordings on the current accent, then just loop through other accents (except for the deficient one)
			let firstAvailableRecording = document.getElementsByClassName("play").item(0)
			if ( firstAvailableRecording != null ){
				firstAvailableRecording.click();
			}else{
				let availableAccents = document.getElementsByClassName('accents_tabs').item(0).getElementsByTagName("a")
				for ( let i = 0 ; i < availableAccents.length ; i++ ){
					let accentItem = availableAccents.item(i)
					// This function would supposedly run loop through the available accents -from the index 0-,
					// and it successfully found a recording at the clicked page, then the flow control would go back to this encompassing loop and pass to the break statement
					// Sidenote : I've chosen not to over-engineer this conditional statement over making it more precise by evading the initially  deficient accent while lopping through them
					if ( accentItem.className != 'active' ){
						accentItem.click()
						break
					}
				}
			}
		}else {
			// If the user inputted a word that's not available at the initial page,
			// then this function will play the first language of the available horizontal tabular languages
			(function playFirstSubstituteLanguage(){
				let availableLanguagesArray = availableLanguagesUlItem.getElementsByClassName("navLangItem")
				let firstSubstituteLanguage = availableLanguagesArray.item(0)
				// Play the first substitute language
				firstSubstituteLanguage.getElementsByTagName("a").item(0).click()
			}())

		}
		
	}else {
		console.log("No matching languages available!")
	}
})();

function playSound() {
    document.getElementsByClassName("play").item(activeElementIndex).click();
}

function switchToFirstTabularLanguage(){
	if ( availableLanguages != 0 ){
		console.log("Value here to be processed!")
	}
}

function highlightRecording(movementValue) {
	// Two nested functions to mitigate some inconsistency in the case of an additional separate exact match
	if ( separateExactMatching.item(0).getElementsByTagName('li').length == 1 ){
		if ( ( ( activeElementIndex == 0 )  || ( activeElementIndex+movementValue < 0 ) ) &&  ( Math.abs(movementValue) == 2 ) ){
			movementValue -= movementValue/2
		}
	} 
	activeElementIndex += movementValue
	if ( (activeElementIndex < 0) || (activeElementIndex > (recordingsLength-1)) ){
		activeElementIndex -= movementValue
	}else {
		highlightElement( (activeElementIndex-movementValue), activeElementIndex)
		document.getElementsByClassName('play').item(activeElementIndex).classList.add('active-element')
	}
}

function highlightElement(previousElementIndex, newElementIndex) {
	document.getElementsByClassName("play").item(previousElementIndex).style = "";
	document.getElementsByClassName("play").item(newElementIndex).style = "border:solid thin lightblue; border-radius:3px; background-color:#d8d8d8";
}

function keypressCheck(keypressEvent) {
    if (document.activeElement != document.getElementById("word_search_header")) {
        keypressEvent.returnValue = false;
        switch (keypressEvent.code) {
            case "Space":
                playSound();
                break;
            case "KeyW":
                highlightRecording(-2);
                break;
            case "KeyS":
                highlightRecording(2);
                break;
            case "KeyD":
                highlightRecording(1);
                break;
            case "KeyA":
                highlightRecording(-1);
                break;
        }
        (function searchBoxFunctionality() {
            if (keypressEvent.shiftKey && keypressEvent.key == "Q") {
                document.getElementById("word_search_header").value = "";
                document.getElementById("word_search_header").focus();
            } else if (keypressEvent.key == "q") {
                document.getElementById("word_search_header").focus();
            }
        })();
    }
}

window.addEventListener("keydown", keypressCheck, false);

//this code for redeeming the instances where there is absolutely no recordings within any english type of pronunciation
//it still needs additional code for running the first instance when landing on the new page .
//let currentTabElement = document.getElementsByClassName('active').item(0).textContent.includes('English')
//if (currentTabElement == false){
//document.getElementsByClassName('navLangItem').item(0).click()
//window.__uspapi() = undefined
//}

//The audio might not be working due to loading from other CDN issues or anything
//It might be resolved with something async/await code
