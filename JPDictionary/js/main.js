import * as study from "./study.js";
import * as dict from "./dict.js";
import * as sortfilter from "./sortfilter.js";

//State arrays
const allStates = document.querySelectorAll(".state");
let stateStyles;

function init() {

  //State arrays
  stateStyles = ["grid", "block", "block", "block", "block", "block", "block", "block"];

  //Clears out every state except home
  for (let i = 1; i < 8; i++) {
    allStates[i].style.display = "none";
  }

  //Initialize dictionary
  dict.init();

  //Study Variables
  study.init();

  sortfilter.init();
  setupUI();

  location.hash = 0;
}

function setupUI() {


  //Sets state buttons to change state when clicked
  let stateButtons = document.querySelectorAll(".stateButton");
  for (const b of stateButtons) {
    b.addEventListener("click", changeState);
  }

  let clearButtons = document.querySelectorAll(".clear");
  for (const b of clearButtons) {
    b.onclick = (e) => {
      //Clears search bar text
      b.parentElement.querySelector(".searchterm").value = "";

      //Clears filters
      b.parentElement.parentElement.querySelector(".clearFilter").click();

      //Presses search button
      b.previousElementSibling.click();
    }
  }

  let searchButtons = document.querySelectorAll(".search");
  let searchFields = document.querySelectorAll(".searchterm");
  function searchVocab(e) {
    //Gets search bar text
    let search = searchFields[0].value;

    //Creates matching entries array
    let matchingEntries;

    //Gets part of speech filter info
    let posFilter = [];
    let posCheckboxes = document.querySelector(".posFilters").querySelectorAll(".singleSelect");

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

    //If search is not any empty string
    if (search) {
      //Gets list of matching entries
      matchingEntries = dict.getVocabByString(search, posFilter, sortfilter.getVocabFilerDate());
    }

    //If there are no matching entries, get the entire vocab list
    if (!matchingEntries || matchingEntries == []) {
      matchingEntries = dict.getVocabList(posFilter, sortfilter.getVocabFilerDate());
    }

    //Displays matching entries entries
    dict.displayVocabList(matchingEntries);
  };
  function searchKanji(e) {
    //Gets search bar text
    let search = searchFields[1].value;

    //Creates matching entries array
    let matchingEntries;

    //If search is not any empty string
    if (search) {
      //Gets list of matching entries
      matchingEntries = dict.getKanjiByString(search, sortfilter.getKanjiFilterDate());
    }

    //If there are no matching entries, get the entire vocab list
    if (!matchingEntries || matchingEntries == []) {
      matchingEntries = dict.getKanjiList(sortfilter.getKanjiFilterDate());
    }

    //Displays matching entries entries
    dict.displayKanjiList(matchingEntries);
  };
  searchButtons[0].onclick = searchVocab;
  searchFields[0].onkeypress = (e) => {
    if (e.key == "Enter") {
      searchVocab(e);
    }
  };

  searchButtons[1].onclick = searchKanji;
  searchFields[1].onkeypress = (e) => {
    if (e.key == "Enter") {
      searchKanji(e);
    }
  };

  

  window.onkeyup = (e) => {
    if (allStates[7].style.display != "none") {
      study.studyControls(e);
    }

  };
}

//Functions




function changeState(e) {
  //Clears all states
  for (let i = 0; i < 8; i++) {
    //allStates[i].style.display = "none";
  }
  let newState = e.target.dataset.stateindex;


  //Unique state setup
  if (newState == 3) {
    //Gets part of speech array from element
    let pos = e.target.dataset.pos.split(';');

    //Gets list of eligible entries
    let entryList = dict.getVocabList(pos);

    //Displays list
    dict.displayVocabList(entryList);
  }
  else if (newState == 4) {
    //Gets list of kanji
    let entryList = dict.getKanjiList();

    //Displays list
    dict.displayKanjiList(entryList);
  }
  else if (newState == 0) {
    //Gets list of vocab inputs
    let vocabInputs = document.querySelectorAll(".vocabEntry");

    //If there are multiple input fields, remove all but one
    if (vocabInputs.length > 1) {
      for (let i = 1; i < vocabInputs.length; i++) {
        vocabInputs[i].querySelector(".removeButton").click();
      }
    }
    //Gets list of kanji inputs
    let kanjiInputs = document.querySelectorAll(".kanjiEntry");

    //If there are multiple input fields, remove all but one
    if (kanjiInputs.length > 1) {
      for (let i = 1; i < kanjiInputs.length; i++) {
        kanjiInputs[i].querySelector(".removeButton").click();
      }
    }

    dict.resetEditingFields();
  }

  else if (newState == 7) {
    //Changes to study state
    study.toStudyState();
  }
  else if (newState == 6 && !study.canStudy()) {
    console.log("Not enough entries to study");
    return;
  }

  //Sets new state
  //allStates[parseInt(newState)].style.display = stateStyles[newState];

  location.hash = e.target.dataset.stateindex;
}

window.onhashchange = (e) => {
  //Clears all states
  for (let i = 0; i < 8; i++) {
    allStates[i].style.display = "none";
  }
  let newState = location.hash.substr(1);

  if (!newState || newState >= allStates.length) {
    newState = 0;
  }
  //Sets new state
  allStates[parseInt(newState)].style.display = stateStyles[newState];
};




export { init };