import * as sortfilter from "./sortfilter.js";
import * as dict from "./dict.js";

//Study Variables
let entriesToStudy;
let currentCard, vocabCount, kanjiCount;
let cardInfo;
let flashCardElement;
let studyEndElement;
let cardArrangements;
let vocabArrangement;
let kanjiArrangement;
let selectedVocab;
let selectedKanji;
let nVocabElement;
let nKanjiElement;

function init() {
    entriesToStudy = [];
    cardInfo = document.querySelectorAll(".cardInfo");
    flashCardElement = document.querySelector("#flashCards");
    studyEndElement = document.querySelector("#studyEnd");
    cardArrangements = [[0, 1, 3], [0, 2, 3], [2, 3, 0], [2, 0, 1]];
    vocabArrangement = cardArrangements[0];
    kanjiArrangement = cardArrangements[0];
    selectedVocab = [];
    selectedKanji = [];
    nVocabElement = document.querySelector("#nVocab");
    nKanjiElement = document.querySelector("#nKanji");
    setupUI();
}

function setupUI() {
    let prevButton = document.querySelector("#prevButton");
    let nextButton = document.querySelector("#nextButton");
    prevButton.onclick = toPreviousCard;
    nextButton.onclick = toNextCard;

    flashCardElement.onclick = (e) => {
        //Toggles current cards flipped status
        entriesToStudy[currentCard].flipped = !entriesToStudy[currentCard].flipped;

        //Updates current card
        updateStudyCard();
    };

    let shuffleButton = document.querySelector("#shuffle");
    shuffleButton.onclick = (e) => {
        //Resets current card
        currentCard = 0;

        //Creates new entries array
        let newEntries = [];

        //Shuffles vocab and kanji sections
        for (let i = vocabCount; i > 0; i--) {
            //Gets random index
            let rndIndex = Math.floor(Math.random() * i);

            //Sets entry at random index to not flipped
            entriesToStudy[rndIndex].flipped = false;

            //Removes entry at random index and places it in new array
            newEntries.push(entriesToStudy.splice(rndIndex, 1)[0]);
        }
        for (let i = kanjiCount; i > 0; i--) {
            //Gets random index
            let rndIndex = Math.floor(Math.random() * i);

            //Sets entry at random index to not flipped
            entriesToStudy[rndIndex].flipped = false;

            //Removes entry at random index and places it in new array
            newEntries.push(entriesToStudy.splice(rndIndex, 1)[0]);
        }

        //Sets entries to study equal to the new array
        entriesToStudy = newEntries;

        //Shows flashcards and hides end screen
        flashCardElement.style.display = "block";
        studyEndElement.style.display = "none";

        //Updates displayed card
        updateStudyCard();
    };

    let startStudyButton = document.querySelector("#startStudy");
    startStudyButton.addEventListener("click", (e) => {
        //Sets new entry counts
        vocabCount = parseInt(nVocabElement.value);        
        kanjiCount = parseInt(nKanjiElement.value);
        let dictVocabCount = dict.getVocabCount();
        let dictKanjiCount = dict.getKanjiCount();
        //Checks to see if a valid number of entries has been sumbitted
        if ((0 >= vocabCount && 0 >= kanjiCount)) {
            //Maxes out vocab count and kanji count
            vocabCount = dictVocabCount;
            kanjiCount = dictKanjiCount;
        }
        if (vocabCount > dictVocabCount) {
            //Maxes out vocab count
            vocabCount = dictVocabCount;
        }
        if (kanjiCount > dictKanjiCount) {
            //Maxes out kanji count
            kanjiCount = dictKanjiCount;
        }


        //Resets entriesToStudy
        entriesToStudy = [];

        //Gets part of speech filter info
        let posFilter = [];
        let posCheckboxes = document.querySelectorAll(".posFilters")[1].querySelectorAll(".singleSelect");

        //Pushes checked parts of speech
        for (const c of posCheckboxes) {
            if (c.checked) {
                posFilter.push(c.value);
            }
        }

        //If no parts of speech are selected, makes filter blank
        if (posFilter.length == 0) {
            posFilter = "";
        }

        //Generates random list of terms
        let vocabList = dict.getRandomVocabList(posFilter, sortfilter.getStudyFilterDate(), vocabCount);
        let kanjiList = dict.getRandomKanjiList(sortfilter.getStudyFilterDate(), kanjiCount);
        

        //Updates kanji and vocab count
        vocabCount = vocabList.length;
        kanjiCount = kanjiList.length;

        //Combines vocab list and kanji list into entries to study
        for (let i = 0; i < vocabCount; i++) {
            entriesToStudy.push({ index: vocabList[i], type: "vocab", flipped: false });
        }
        for (let i = 0; i < kanjiCount; i++) {
            entriesToStudy.push({ index: kanjiList[i], type: "kanji", flipped: false });
        }
    });

    let studySelectedButton = document.querySelector("#studySelected");
    studySelectedButton.onclick = (e) => {
        vocabCount = selectedVocab.length;
        kanjiCount = selectedKanji.length;

        //Clears entries to study
        entriesToStudy = [];

        //Combines selected vocab list and kanji list into entries to study
        for (let i = 0; i < selectedVocab.length; i++) {
            entriesToStudy.push({ index: selectedVocab[i], type: "vocab", flipped: false });
        }
        for (let i = 0; i < selectedKanji.length; i++) {
            entriesToStudy.push({ index: selectedKanji[i], type: "kanji", flipped: false });
        }
    };
    let vocabConfigOptions = document.querySelector("#vocabArrange").children;
    let kanjiConfigOptions = document.querySelector("#kanjiArrange").children;

    for (const v of vocabConfigOptions) {
        v.onclick = (e) => {
            vocabArrangement = cardArrangements[v.value];
            //console.log(v.value);
        };
    }
    for (const k of kanjiConfigOptions) {
        k.onclick = (e) => {
            kanjiArrangement = cardArrangements[k.value];
            //console.log(k.value);
        };
    }
}

function toNextCard() {
    //Increases current card by one
    currentCard++;

    //Checks to see if it is greater than the total card count
    if (currentCard >= kanjiCount + vocabCount) {
        //Sets current card equal to the card count
        currentCard = kanjiCount + vocabCount;

        //Hides flashcards and shows end screen
        flashCardElement.style.display = "none";
        studyEndElement.style.display = "flex";
    }
    else {
        //Updates card information
        updateStudyCard();
    }
}

function toPreviousCard() {
    if (currentCard > 0) {
        //Decreases current card by one
        currentCard--;

        //Shows flashcards and hides end screen
        flashCardElement.style.display = "block";
        studyEndElement.style.display = "none";

        //Updates card information
        updateStudyCard();
    }
}

function updateStudyCard() {
    //Shows back of card if it is flipped and front of card if not
    if (entriesToStudy[currentCard].flipped) {
        cardInfo[0].parentElement.style.display = "none";
        cardInfo[2].parentElement.style.display = "block";
    }
    else {
        cardInfo[0].parentElement.style.display = "block";
        cardInfo[2].parentElement.style.display = "none";
    }

    //Clears out card info
    for (const c of cardInfo) {
        c.innerText = "";
    }

    //Gets vocab and kanji count elements
    let vocabCountElement = document.querySelector("#vocabCount");
    let kanjiCountElement = document.querySelector("#kanjiCount");


    //Displays entry based on the information it has stored
    if (entriesToStudy[currentCard].type == "vocab") {
        //Gets vocab entry
        let vocabEntry = dict.getVocabByIndex(entriesToStudy[currentCard].index);
        if (vocabEntry.kanji) {
            cardInfo[vocabArrangement[0]].innerText = vocabEntry.kanji;
            cardInfo[vocabArrangement[1]].innerText = vocabEntry.hirakata;
        }
        else {
            cardInfo[vocabArrangement[1]].innerText = "";
            cardInfo[vocabArrangement[0]].innerText = vocabEntry.hirakata;
        }

        cardInfo[vocabArrangement[2]].innerText = vocabEntry.english;

        //Updates vocab and kanji count elements
        vocabCountElement.innerText = "Vocab: " + (currentCard + 1) + "/" + vocabCount;
        kanjiCountElement.innerText = "Kanji: " + "0/" + kanjiCount;
    }
    else if (entriesToStudy[currentCard].type == "kanji") {
        //Gets vocab entry
        let kanjiEntry = dict.getKanjiByIndex(entriesToStudy[currentCard].index);
        cardInfo[kanjiArrangement[0]].innerText = kanjiEntry.character;
        cardInfo[kanjiArrangement[1]].innerText = "On: " + kanjiEntry.on + "\n" + " Kun: " + kanjiEntry.kun;
        cardInfo[kanjiArrangement[2]].innerText = kanjiEntry.english;

        //Updates vocab and kanji count elements
        vocabCountElement.innerText = "Vocab: " + vocabCount + "/" + vocabCount;
        kanjiCountElement.innerText = "Kanji: " + (currentCard - vocabCount + 1) + "/" + kanjiCount;
    }
}

function toStudyState() {
    //Resets current card
    currentCard = 0;

    //Updates card information
    updateStudyCard();

    //Shows flashcards and hides end screen
    flashCardElement.style.display = "block";
    studyEndElement.style.display = "none";
}

function entryOnClick(type, o) {
    if (type == "vocab") {
        //Toggles entry selection when they are pressed
        if (selectedVocab.includes(o.dataset.index)) {
            selectedVocab.splice(selectedVocab.indexOf(o.dataset.index), 1);
            o.style.backgroundColor = "white";
        }
        else {
            selectedVocab.push(o.dataset.index);
            o.style.backgroundColor = "#FFD374";
        }
    }
    else if (type == "kanji") {
        //Toggles entry selection when they are pressed
        if (selectedKanji.includes(o.dataset.index)) {
            selectedKanji.splice(selectedKanji.indexOf(o.dataset.index), 1);
            o.style.backgroundColor = "white";
        }
        else {
            selectedKanji.push(o.dataset.index);
            o.style.backgroundColor = "#FFD374";
        }
    }
}

function entryInit(type, o) {
    if (type == "vocab") {
        //Changes background color if v is already selected
        if (selectedVocab.includes(o.dataset.index)) {
            o.style.backgroundColor = "#FFD374";
        }
    }
    else if (type == "kanji") {
        //Changes background color if v is already selected
        if (selectedKanji.includes(o.dataset.index)) {
            o.style.backgroundColor = "#FFD374";
        }
    }

}

function studyControls(e){
    if (e.key == "ArrowRight") {
        toNextCard();
    }
    else if (e.key == "ArrowLeft") {
        toPreviousCard();
    }
    else if (e.key == " " || e.key == "ArrowUp" || e.key == "ArrowDown") {
        //Toggles current cards flipped status
        entriesToStudy[currentCard].flipped = !entriesToStudy[currentCard].flipped;

        //Updates current card
        updateStudyCard();
    }
}

function canStudy(){
    return entriesToStudy.length > 0;
}

export { init, entryInit, entryOnClick, toStudyState,studyControls, canStudy }