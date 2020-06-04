(function(){

window.onload= (e) => {
  document.querySelector("#submitVocab").onclick = vocabEntered;
  document.querySelector("#submitKanji").onclick = kanjiEntered;
  document.querySelector("#addVocabEntry").onclick = addVocabInput;
  document.querySelector("#addKanjiEntry").onclick = addKanjiInput;

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
  function searchVocab(e){
      //Gets search bar text
      let search = searchFields[0].value;

      //Creates matching entries array
      let matchingEntries;

      //Gets part of speech filter info
      let posFilter = [];
      let posCheckboxes = document.querySelector(".posFilters").querySelectorAll(".singleSelect");

      //Pushes checked parts of speech
      for (const c of posCheckboxes) {
        if(c.checked){
          posFilter.push(c.value);
        }
      }

      //If no parts of speech are selected, makes filter blank
      if(posFilter.length == 0){
        posFilter = "";
      }
      
      //If search is not any empty string
      if(search){
        //Gets list of matching entries
        matchingEntries = getVocabByString(search, posFilter, vocabFilterDate);
      }
  
      //If there are no matching entries, get the entire vocab list
      if(!matchingEntries || matchingEntries == []){
        matchingEntries = getVocabList(posFilter, vocabFilterDate);
      }
  
      //Displays matching entries entries
      displayVocabList(matchingEntries);
  };
  function searchKanji(e){
    //Gets search bar text
    let search = searchFields[1].value;

    //Creates matching entries array
    let matchingEntries;

    //If search is not any empty string
    if(search){
      //Gets list of matching entries
      matchingEntries = getKanjiByString(search, kanjiFilterDate);
    }

    //If there are no matching entries, get the entire vocab list
    if(!matchingEntries || matchingEntries == []){
      matchingEntries = getKanjiList(kanjiFilterDate);
    }

    //Displays matching entries entries
    displayKanjiList(matchingEntries);
  };
  searchButtons[0].onclick = searchVocab;
  searchFields[0].onkeypress = (e) =>{
    if(e.key == "Enter"){
      searchVocab(e);
    }
  };

  searchButtons[1].onclick = searchKanji;
  searchFields[1].onkeypress = (e) =>{
    if(e.key == "Enter"){
      searchKanji(e);
    }
  };

  let removeButtons = document.querySelectorAll(".removeButton");
  for (const b of removeButtons) {
    b.onclick = removeInput;
  }

  let vocabTimeFilters = document.querySelectorAll(".vocabTime");
  let kanjiTimeFilters = document.querySelectorAll(".kanjiTime");
  let studyTimeFilters = document.querySelectorAll(".studyTime");
  
  for (const f of vocabTimeFilters) {
    f.onclick= (e) =>{
      //Gets current time and submitted time
      let now = new Date();
      let submittedTime = new Date();

      //Sets filter time based on selection
      switch(f.value){
        case "all":
          //Makes submitted time blank
          submittedTime = "";
          break;
        case "week":
          //Submitted time is set to a week ago
          submittedTime.setTime(now.getTime() - 604800000);
          break;
        case "twoWeeks":
          //Submitted time is set to two weeks ago
          submittedTime.setTime(now.getTime() - 604800000 * 2);
          break;
        case "month":
          //Submitted time is set to a month ago
          submittedTime.setTime(now.getTime() - 604800000 * 4);
          break;
        case "sixMonths":
          //Submitted time is set to six months ago
          submittedTime.setTime(now.getTime() - 604800000 * 24);
          break;
      };

      //Sets vocab filter date to the submitted time
      vocabFilterDate = submittedTime;
    }
  }

  for (const f of kanjiTimeFilters) {
    f.onclick= (e) =>{
      //Gets current time and submitted time
      let now = new Date();
      let submittedTime = new Date();

      //Sets filter time based on selection
      switch(f.value){
        case "all":
          //Makes submitted time blank
          submittedTime = "";
          break;
        case "week":
          //Submitted time is set to a week ago
          submittedTime.setTime(now.getTime() - 604800000);
          break;
        case "twoWeeks":
          //Submitted time is set to two weeks ago
          submittedTime.setTime(now.getTime() - 604800000 * 2);
          break;
        case "month":
          //Submitted time is set to a month ago
          submittedTime.setTime(now.getTime() - 604800000 * 4);
          break;
        case "sixMonths":
          //Submitted time is set to six months ago
          submittedTime.setTime(now.getTime() - 604800000 * 24);
          break;
      };

      //Sets vocab filter date to the submitted time
      kanjiFilterDate = submittedTime;
    }
  }

  for (const s of studyTimeFilters) {
    s.onclick= (e) =>{
      //Gets current time and submitted time
      let now = new Date();
      let submittedTime = new Date();

      //Sets filter time based on selection
      switch(s.value){
        case "all":
          //Makes submitted time blank
          submittedTime = "";
          break;
        case "week":
          //Submitted time is set to a week ago
          submittedTime.setTime(now.getTime() - 604800000);
          break;
        case "twoWeeks":
          //Submitted time is set to two weeks ago
          submittedTime.setTime(now.getTime() - 604800000 * 2);
          break;
        case "month":
          //Submitted time is set to a month ago
          submittedTime.setTime(now.getTime() - 604800000 * 4);
          break;
        case "sixMonths":
          //Submitted time is set to six months ago
          submittedTime.setTime(now.getTime() - 604800000 * 24);
          break;
      };

      //Sets vocab filter date to the submitted time
      studyFilterDate = submittedTime;
    }
  }

  let posCheckboxes = document.querySelectorAll(".posFilters");
  for (const p of posCheckboxes) {
    let allBoxes = p.querySelectorAll("input");

    allBoxes[0].onclick = (e) =>{
      for(let i = 1; i < allBoxes.length; i++){
        allBoxes[i].checked = allBoxes[0].checked;
      }
    }

    let multiSelectButtons = [2, 6];
    for (const i of multiSelectButtons) {
      allBoxes[i].onclick = (e) =>{
        for(let j = 1; e.target.dataset.children >= j; j++){
          allBoxes[i+j].checked = allBoxes[i].checked;
        }
      }
    }
  }

  let clearFilterButtons = document.querySelectorAll(".clearFilter");

  for (const c of clearFilterButtons) {
    c.onclick = (e) => {
      //Clicks all time filter
      let timeFilters = c.previousElementSibling;
      timeFilters.querySelector(".all").click();

      let parent = c.parentElement;
      //Gets all parts of speech button
      let allPos = parent.querySelector(".allSelect");

      if(allPos){
        //Click it if it is checked and click it twice if it isn't
        allPos.click();
        if(allPos.checked){
          allPos.click();
        }
      }
    };    
  }
  
  let shuffleButton = document.querySelector("#shuffle");
  shuffleButton.onclick = (e) =>{
    //Resets current card
    currentCard = 0;

    //Creates new entries array
    let newEntries = [];

    //Shuffles vocab and kanji sections
    for(let i = vocabCount; i > 0; i--){
      //Gets random index
      let rndIndex = Math.floor(Math.random() * i);

      //Sets entry at random index to not flipped
      entriesToStudy[rndIndex].flipped = false;

      //Removes entry at random index and places it in new array
      newEntries.push(entriesToStudy.splice(rndIndex, 1)[0]);
    }
    for(let i = kanjiCount; i > 0; i--){
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
  startStudyButton.addEventListener("click", (e) =>{
    //Sets new entry counts
    vocabCount = parseInt(nVocabElement.value);
    kanjiCount = parseInt(nKanjiElement.value);
    
    //Checks to see if a valid number of entries has been sumbitted
    if((0 >= vocabCount && 0 >= kanjiCount)){
      //Maxes out vocab count and kanji count
      vocabCount = jpDict.vocab.count;
      kanjiCount = jpDict.kanji.count;
    }
    if(vocabCount > jpDict.vocab.count){
      //Maxes out vocab count
      vocabCount = jpDict.vocab.count;
    }
    if(kanjiCount > jpDict.kanji.count){
      //Maxes out kanji count
      kanjiCount = jpDict.kanji.count;
    }

    //Resets entriesToStudy
    entriesToStudy = [];

    //Gets part of speech filter info
    let posFilter = [];
    let posCheckboxes = document.querySelectorAll(".posFilters")[1].querySelectorAll(".singleSelect");

    //Pushes checked parts of speech
    for (const c of posCheckboxes) {
      if(c.checked){
        posFilter.push(c.value);
      }
    }

    //If no parts of speech are selected, makes filter blank
    if(posFilter.length == 0){
      posFilter = "";
    }

    //Generates random list of terms
    let vocabList = getRandomVocabList(posFilter, studyFilterDate, vocabCount);
    let kanjiList = getRandomKanjiList(studyFilterDate, kanjiCount);

    //Updates kanji can vocab count
    vocabCount = vocabList.length;
    kanjiCount = kanjiList.length;

    //Combines vocab list and kanji list into entries to study
    for(let i = 0; i < vocabCount; i++){
      entriesToStudy.push({index: vocabList[i], type: "vocab", flipped: false});
    }
    for(let i = 0; i < kanjiCount; i++){
      entriesToStudy.push({index: kanjiList[i], type: "kanji", flipped: false});
    }
  });

  let vocabConfigOptions = document.querySelector("#vocabArrange").children;
  let kanjiConfigOptions = document.querySelector("#kanjiArrange").children;

  for (const v of vocabConfigOptions) {
    v.onclick = (e) =>{
      vocabArrangement = cardArrangements[v.value];
      console.log(v.value);
    };
  }
  for (const k of kanjiConfigOptions) {
    k.onclick = (e) =>{
      kanjiArrangement = cardArrangements[k.value];
      console.log(k.value);
    };
  }

  let studySelectedButton = document.querySelector("#studySelected");
  studySelectedButton.onclick = (e) =>{
    vocabCount = selectedVocab.length;
    kanjiCount = selectedKanji.length;

    //Clears entries to study
    entriesToStudy = [];

    //Combines selected vocab list and kanji list into entries to study
    for(let i = 0; i < selectedVocab.length; i++){
      entriesToStudy.push({index: selectedVocab[i], type: "vocab", flipped: false});
    }
    for(let i = 0; i < selectedKanji.length; i++){
      entriesToStudy.push({index: selectedKanji[i], type: "kanji", flipped: false});
    }
  };

  let hideFilterButton = document.querySelectorAll(".filterButton");
  for (const b of hideFilterButton) {
    b.onclick = (e) =>{
      //Toggles filter visibility
      let filterDiv = b.nextElementSibling;
      if(filterDiv.style.display == "none" || !filterDiv.style.display){
        filterDiv.style.display = "grid";
      }
      else{
        filterDiv.style.display = "none";
      }
    };
  }

  let vocabEditButton = document.querySelector("#vocabEdit");
  vocabEditButton.onclick = (e) =>{
    //Toggles edit mode
    editButtonPushed = !editButtonPushed;

    //Changes border color for all entries
    if(editButtonPushed){
      for (const v of vocabEntriesElement.children) {
        vocabEntriesElement.style.borderColor = "#0E652B";
        v.style.borderColor = "#0E652B";
      }

      vocabEditButton.style.backgroundColor = "#0E652B";
      vocabEditButton.style.color = "#D3D4D9";

    }
    else{
      for (const v of vocabEntriesElement.children) {
        vocabEntriesElement.style.borderColor = "#F4861F";
        v.style.borderColor = "#F4861F";
      }

      vocabEditButton.style.backgroundColor = "#F4861F";
      vocabEditButton.style.color = "#071E22";

      isEditing = false;
      editVocab = "";

      //Resets page
      searchButtons[0].click();
    }    
  };

  let kanjiEditButton = document.querySelector("#kanjiEdit");
  kanjiEditButton.onclick = (e) =>{
    //Toggles edit mode
    editButtonPushed = !editButtonPushed;

    //Changes border color for all entries
    if(editButtonPushed){
      for (const v of kanjiEntriesElement.children) {
        kanjiEntriesElement.style.borderColor = "#0E652B";
        v.style.borderColor = "#0E652B";
      }

      kanjiEditButton.style.backgroundColor = "#0E652B";
      kanjiEditButton.style.color = "#D3D4D9";
    }
    else{
      for (const v of kanjiEntriesElement.children) {
        kanjiEntriesElement.style.borderColor = "#F4861F";
        v.style.borderColor = "#F4861F";
      }

      kanjiEditButton.style.backgroundColor = "#F4861F";
      kanjiEditButton.style.color = "#071E22";

      isEditing = false;
      editKanji = "";

      //Resets page
      searchButtons[0].click();
    }    
  };

  let saveVocabEdit = document.querySelector("#saveVocab");
  saveVocabEdit.onclick = (e) =>{
    if(isEditing){
      let vocabInfo = editVocab.querySelectorAll("textarea");
      console.log(vocabInfo);
      editVocabEntry(editVocab.dataset.index, vocabInfo[0].value, vocabInfo[1].value, vocabInfo[2].value);

      isEditing = false;
      editButtonPushed = false;
      editVocab = "";

      vocabEditButton.style.backgroundColor = "#F4861F";
      vocabEditButton.style.color = "#071E22";

      //Resets page
      searchButtons[0].click();
      
      saveDictionaryToFile();
    }
  };

  let saveKanjiEdit = document.querySelector("#saveKanji");
  saveKanjiEdit.onclick = (e) =>{
    if(isEditing){
      let kanjiInfo = editKanji.querySelectorAll("textarea");
      console.log(kanjiInfo);
      editKanjiEntry(editKanji.dataset.index, kanjiInfo[0].value, kanjiInfo[2].value, kanjiInfo[1].value, kanjiInfo[3].value);

      isEditing = false;
      editButtonPushed = false;
      editKanji = "";

      kanjiEntriesElement.style.backgroundColor = "#F4861F";
      kanjiEntriesElement.style.color = "#071E22";

      //Resets page
      searchButtons[1].click();

      saveDictionaryToFile();
    }
  };

  let deleteVocabEdit = document.querySelector("#deleteVocab");
  deleteVocabEdit.onclick = (e) =>{
    if(isEditing){
      removeVocabAtIndex(editVocab.dataset.index);

      isEditing = false;
      editButtonPushed = false;
      editVocab = "";

      vocabEditButton.style.backgroundColor = "#F4861F";
      vocabEditButton.style.color = "#071E22";

      //Resets page
      searchButtons[0].click();
      
      saveDictionaryToFile();
    }
  };

  let deleteKanjiEdit = document.querySelector("#deleteKanji");
  deleteKanjiEdit.onclick = (e) =>{
    if(isEditing){
      removeKanjiAtIndex(editKanji.dataset.index);

      isEditing = false;
      editButtonPushed = false;
      editKanji = "";

      kanjiEntriesElement.style.backgroundColor = "#F4861F";
      kanjiEntriesElement.style.color = "#071E22";

      //Resets page
      searchButtons[1].click();

      saveDictionaryToFile();
    }
  };

  let prevButton = document.querySelector("#prevButton");
  let nextButton = document.querySelector("#nextButton");
  prevButton.onclick = toPreviousCard;
  nextButton.onclick = toNextCard;
};


//Declares dictionary object
let jpDict = "";
let vocabEntriesElement = document.querySelector("#vocabEntries");
let kanjiEntriesElement = document.querySelector("#kanjiEntries");

//State arrays
const allStates = document.querySelectorAll(".state");
let stateStyles = ["grid", "block", "block", "block", "block", "block", "block", "block"];

//Clears out every state except home
for(let i  =1; i < 8; i++){
  allStates[i].style.display = "none";
}


//Local Storage Fields
const prefix = "ac3343-jpDict-";
const vocabPrefix = prefix + "vocab-";
const kanjiPrefix = prefix + "kanji-";

//Filter variables
let vocabFilterDate = "";
let kanjiFilterDate = "";
let studyFilterDate = "";

//Study Variables
let entriesToStudy = [];
let currentCard, vocabCount, kanjiCount;
let cardInfo = document.querySelectorAll(".cardInfo");
let flashCardElement = document.querySelector("#flashCards");
let studyEndElement = document.querySelector("#studyEnd");
let cardArrangements = [[0, 1, 3], [0, 2, 3], [2, 3, 0], [2, 0, 1]];
let vocabArrangement = cardArrangements[0];
let kanjiArrangement = cardArrangements[0];
let selectedVocab = [];
let selectedKanji = [];

//Entry Editing variables
let isEditing, editButtonPushed = false;
let editVocab, editKanji;


loadDictionary();

let nVocabElement = document.querySelector("#nVocab");
let nKanjiElement = document.querySelector("#nKanji");

flashCardElement.onclick = (e) =>{
  //Toggles current cards flipped status
  entriesToStudy[currentCard].flipped = !entriesToStudy[currentCard].flipped;

  //Updates current card
  updateStudyCard();
};

window.onkeyup = (e) => {
  if(allStates[7].style.display != "none"){
    if(e.key == "ArrowRight"){
      toNextCard();
    }
    else if(e.key == "ArrowLeft"){
      toPreviousCard();
    }
    else if(e.key == " "){
      //Toggles current cards flipped status
      entriesToStudy[currentCard].flipped = !entriesToStudy[currentCard].flipped;

      //Updates current card
      updateStudyCard();
    }
  }
  
};


function loadDictionary() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        jpDict = JSON.parse(this.responseText);

        //nVocabElement.max = jpDict.vocab.count;
        //nVocabElement.value = jpDict.vocab.count;
        //nKanjiElement.max = jpDict.kanji.count; 
        //nKanjiElement.value = jpDict.kanji.count; 

        //console.log(jpDict.vocab.dict[2]);
        //console.log(jpDict.kanji.dict[1]);
        //console.log(jpDict);
      }
    };
    xhttp.open("GET", "php/dic/all_dic", true);
    xhttp.send();
}

function saveDictionaryToFile(){
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "php/test.php", true);
  // Set the request header i.e. which type of content you are sending 
  xhttp.setRequestHeader("Content-Type", "application/json"); 
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      console.log(this.responseText);
    }
  };
  let data = JSON.stringify(jpDict);
  xhttp.send(data);
}

function addNewVocab(_kanji, _hirakata, _english, _pos){
  //Creates new vocab object
  let newVocab = new Vocab(_kanji, _hirakata, _english, _pos, new Date());

  //Checks to see if jpDict exists
  if(jpDict){
    //Pushes vocab into dictionary
    jpDict.vocab.dict.push(newVocab);

    //Increases vocab count
    jpDict.vocab.count++;

    console.log("Successfully added new vocab");
  }
  else{
    console.log("Error! jpDict not initialized");
  }
}

function addNewKanji(_character, _kun, _on, _english){
  //Creates new kanji object
  let newKanji = new Kanji(_character, _kun, _on, _english, new Date());

  //Checks to see if jpDict exists
  if(jpDict){
    //Pushes kanji into dictionary
    jpDict.kanji.dict.push(newKanji);

    //Increases kanji count
    jpDict.kanji.count++;

    console.log("Successfully added new kanji");
  }
  else{
    console.log("Error! jpDict not initialized");
  }
}

function removeVocabAtIndex(_index){
  //Checks to see if index is within dictionary count
  if(_index < jpDict.vocab.count && _index >= 0){
    //Removes at index
    jpDict.vocab.dict.splice(_index, 1);

    //Decreases vocab count
    jpDict.vocab.count--;

    console.log("Successfully removed vocab at " + _index);
  }
  else{
    console.log("Error! Index out " +  _index +" of bounds. Vocab dict only has " + jpDict.vocab.count + " entries.");
  }
}

function removeKanjiAtIndex(_index){
  //Checks to see if index is within dictionary count
  if(_index < jpDict.kanji.count && _index >= 0){
    //Removes at index
    jpDict.kanji.dict.splice(_index, 1);

    //Decreases kanji count
    jpDict.kanji.count--;

    console.log("Successfully removed kanji at " + _index);
  }
  else{
    console.log("Error! Index out " +  _index +" of bounds. Kanji dict only has " + jpDict.kanji.count + " entries.");
  }
}

function editVocabEntry(_index, _kanji, _hirakata, _english){
  //Checks to see if index is within dictionary count
  if(_index < jpDict.vocab.count && _index >= 0){
    //Edits entry at index
    jpDict.vocab.dict[_index].kanji = _kanji;
    jpDict.vocab.dict[_index].hirakata = _hirakata;
    jpDict.vocab.dict[_index].english = _english;

    console.log("Edited vocab entry at" + _index);
  }
  else{
    console.log("Error! Index " +  _index +" out  of bounds. Vocab dict only has " + jpDict.vocab.count + " entries.");
  }
}

function editKanjiEntry(_index, _character, _kun, _on, _english){
  //Checks to see if index is within dictionary count
  if(_index < jpDict.kanji.count && _index >= 0){
    //Edits entry at index
    jpDict.kanji.dict[_index].character = _character;
    jpDict.kanji.dict[_index].kun = _kun;
    jpDict.kanji.dict[_index].on = _on;
    jpDict.kanji.dict[_index].english = _english;

    console.log("Edited kanji entry at " + _index);
  }
  else{
    console.log("Error! Index " +  _index +" out  of bounds. Kanji dict only has " + jpDict.kanji.count + " entries.");
  }
}

function getVocabByIndex(_index){
  if(_index < jpDict.vocab.count && _index >= 0){
    return jpDict.vocab.dict[_index];
  }
  else{
    console.log("Error! Index " +  _index +" out  of bounds. Vocab dict only has " + jpDict.vocab.count + " entries.");
  }
  
}

function getKanjiByIndex(_index){
  if(_index < jpDict.kanji.count && _index >= 0){
    return jpDict.kanji.dict[_index];
  }
  else{
    console.log("Error! Index " +  _index +" out  of bounds. Kanji dict only has " + jpDict.kanji.count + " entries.");
  }
}

function displayVocab(_index){
  //Gets vocab entry
  vocabEntry = getVocabByIndex(_index);

  if(vocabEntry){
    //Creates entry element
    let element = "<div data-index = '";
    element += _index;
    element += "' class = 'entry'> <textarea type ='text' rows = '2' cols='4' readonly = 'true' class='col1'>";
    element += vocabEntry.kanji;
    element += "</textarea><textarea type ='text' rows = '2' cols='4' readonly = 'true' class='col2'>";
    element += vocabEntry.hirakata;
    element += "</textarea><p class='col3'>";
    element += vocabEntry.pos;
    element += "</p><textarea type ='text' rows = '2' cols='4' readonly = 'true' class='col4'>";
    element += vocabEntry.english;
    element += "</textarea><p class='col5'>";
    let entryDate = new Date(vocabEntry.entryTime);
    element += entryDate.toLocaleString();
    element += "</p>";
    element += "</div>";

    return element;
  }
  
}

function displayKanji(_index){
  //Gets kanji entry
  kanjiEntry = getKanjiByIndex(_index);

  if(kanjiEntry){
    //Creates entry element
    let element = "<div data-index = '";
    element += _index;
    element += "' class = 'entry'> <textarea type ='text' rows = 1' cols='4' readonly = 'true' class='col1'>";
    element += kanjiEntry.character;
    element += "</textarea><textarea type ='text' rows = '2' cols='4' readonly = 'true' class='col2'>";
    element += kanjiEntry.on;
    element += "</textarea><textarea type ='text' rows = '2' cols='4' readonly = 'true' class='col2'>";
    element += kanjiEntry.kun;
    element += "</textarea><textarea type ='text' rows = '2' cols='4' readonly = 'true' class='col2'>";
    element += kanjiEntry.english;
    element += "</textarea><p class='col5'>";
    let entryDate = new Date(kanjiEntry.entryTime);
    element += entryDate.toLocaleString();
    element += "</p>";
    element += "</div>";

    return element;
  }
  
}

function displayVocabList(_indexArray){
  //Creates string to contain elements
  let entriesString = "";

  //Loops through indexes in index array
  for (const i of _indexArray) {
    //Gets vocab element
    let vocabElement = displayVocab(i);

    if(vocabElement){
      //Adds element of vocab entry i to entries string
      entriesString += vocabElement;
    }
    
  }

  //Sets inner html of entries element to the big string
  vocabEntriesElement.innerHTML = entriesString;

  for (const v of vocabEntriesElement.children) {
    //Changes background color if v is already selected
    if(selectedVocab.includes(v.dataset.index)){
      v.style.backgroundColor = "#FFD374";
    }

    v.onclick = (e) =>{
      if(editButtonPushed && !isEditing){
        //Resets all other border colors
        for (const w of vocabEntriesElement.children) {
          if(w != v){
            w.style.borderColor = "#F4861F";
          }
        }

        vocabEntriesElement.style.borderColor = "#F4861F";

        //Sets is editing to true
        isEditing = true;

        //Enables text boxes
        let inputs = v.querySelectorAll("textarea");
        for (const i of inputs) {
          i.readOnly = false;
        }

        editVocab = v;
      }
      else if(!isEditing){
        //Toggles entry selection when they are pressed
        if(selectedVocab.includes(v.dataset.index)){
          selectedVocab.splice(selectedVocab.indexOf(v.dataset.index), 1);
          v.style.backgroundColor = "white";
        }
        else{
          selectedVocab.push(v.dataset.index);
          v.style.backgroundColor = "#FFD374";
        }
      }
    }
  }
}

function displayKanjiList(_indexArray){
  //Creates string to contain elements
  let entriesString = "";

  //Loops through indexes in index array
  for (const i of _indexArray) {
    //Gets kanji element
    let kanjiElement = displayKanji(i);

    if(kanjiElement){
      //Adds element of kanji entry i to entries string
      entriesString += displayKanji(i);
    }
    
  }

  //Sets inner html of entries element to the big string
  kanjiEntriesElement.innerHTML = entriesString;

  for (const k of kanjiEntriesElement.children) {
    //Changes background color if k is already selected
    if(selectedKanji.includes(k.dataset.index)){
      k.style.backgroundColor = "#FFD374";
    }
    //Toggles entry selection when they are pressed
    k.onclick = (e) =>{
      if(editButtonPushed && !isEditing){
        //Resets all other border colors
        for (const w of kanjiEntriesElement.children) {
          if(w != k){
            w.style.borderColor = "#F4861F";
          }
        }

        kanjiEntriesElement.style.borderColor = "#F4861F";

        //Sets is editing to true
        isEditing = true;

        //Enables text boxes
        let inputs = k.querySelectorAll("textarea");
        for (const i of inputs) {
          i.readOnly = false;
        }

        editKanji = k;
      }
      else if(!isEditing){
        //Toggles entry selection when they are pressed
        if(selectedKanji.includes(k.dataset.index)){
          selectedKanji.splice(selectedKanji.indexOf(k.dataset.index), 1);
          k.style.backgroundColor = "white";
        }
        else{
          selectedKanji.push(k.dataset.index);
          k.style.backgroundColor = "#FFD374";
        }
      }
      
    }
  }
}

function getVocabList(_partsOfSpeech, _date, _numberOfEntries = jpDict.vocab.count){
  //Array of indexes
  let indexes = [];
  
  //Starts loop at most recent dictionary entry.
  let i = jpDict.vocab.count - 1;
  //Runs until the entire dictionary has been searched or the number of entries has been fulfilled
  while(indexes.length < _numberOfEntries && i >= 0){
    //Gets current entry and current entry time
    let currentEntry = getVocabByIndex(i);
    let currentEntryTime = Date.parse(currentEntry.entryTime);

    //If the date is older than the passed in date, the loop stops
    if(_date && currentEntryTime < _date){
      break;
    }
    //If the part of speech matches or isn't required, the index gets pushed in
    if((_partsOfSpeech && _partsOfSpeech.includes(currentEntry.pos)) || !_partsOfSpeech){
      indexes.push(i);
    }
    //Iterates i
    i--;
  }

  //Returns array of indexes
  return indexes;
}

function getKanjiList( _date, _numberOfEntries = jpDict.kanji.count){
  //Array of indexes
  let indexes = [];
  
  //Starts loop at most recent dictionary entry.
  let i = jpDict.kanji.count - 1;
  //Runs until the entire dictionary has been searched or the number of entries has been fulfilled
  while(indexes.length < _numberOfEntries && i >= 0){
    //Gets current entry and current entry time
    let currentEntry = getKanjiByIndex(i);
    let currentEntryTime = Date.parse(currentEntry.entryTime);

    //If the date is older than the passed in date, the loop stops
    if(_date && currentEntryTime < _date){
      break;
    }

    //Pushes in current index
    indexes.push(i);
    //Iterates i
    i--;
  }

  //Returns array of indexes
  return indexes;
}

function getRandomVocabList(_partsOfSpeech, _date, _numberOfEntries = 1){
  //Array of indexes
  let indexes = [];

  //Available indexes from dictionary keys
  let availableIndexes = Object.keys(jpDict.vocab.dict);
  
  
  //Runs until the entire dictionary has been searched or the number of entries has been fulfilled
  while(indexes.length < _numberOfEntries && availableIndexes.length > 0){
    //Randomly generates index
    let i = Math.floor(Math.random() * availableIndexes.length);
    let selectedIndex = parseInt(availableIndexes[i]);

    //Gets current entry and current entry time
    let currentEntry = getVocabByIndex(selectedIndex);
    let currentEntryTime = Date.parse(currentEntry.entryTime);

    //If the entry is newer than the requested date and the part of speech matches or isn't required
    if(((_date && currentEntryTime >= _date) || !_date) && ((_partsOfSpeech && _partsOfSpeech.includes(currentEntry.pos)) || !_partsOfSpeech)){
      //Adds selected index
      indexes.push(selectedIndex);
    }
    
    //Removes selected index from available indexes
    availableIndexes.splice(i, 1);
  }

  //Returns array of indexes
  return indexes;
}

function getRandomKanjiList(_date ,_numberOfEntries = 1){
  //Array of indexes
  let indexes = [];

  //Available indexes from dictionary keys
  let availableIndexes = Object.keys(jpDict.kanji.dict);
  
  
  //Runs until the entire dictionary has been searched or the number of entries has been fulfilled
  while(indexes.length < _numberOfEntries && availableIndexes.length > 0){
    //Randomly generates index
    let i = Math.floor(Math.random() * availableIndexes.length);
    let selectedIndex = parseInt(availableIndexes[i]);

    //Gets current entry and current entry time
    let currentEntry = getKanjiByIndex(selectedIndex);
    let currentEntryTime = Date.parse(currentEntry.entryTime);

    //If the entry is newer than the requested date and the part of speech matches or isn't required
    if(((_date && currentEntryTime >= _date) || !_date)){
      //Adds selected index
      indexes.push(selectedIndex);
    }
    
    //Removes selected index from available indexes
    availableIndexes.splice(i, 1);
  }

  //Returns array of indexes
  return indexes;
}

function vocabEntered(){
  //Gets array of submitted vocab
  let submittedVocab = document.querySelector("#enterVocab").children;

  //Loops through submitted vocab
  for (const v of submittedVocab) {
    if(v.className == "vocabEntry"){
      let vocabEntry = v.children;
      
      //Adds new vocab based on submitted info
      addNewVocab(vocabEntry[0].value, vocabEntry[1].value, vocabEntry[2].value, vocabEntry[3].value);      
    }
  }

  //Removes all inputs
  for(let i = submittedVocab.length - 1; i > 1; i--){
    let vocabEntry = submittedVocab[i].children;

    //Presses remove entry
    vocabEntry[4].click();
  }

  addVocabInput();

  let firstEntry = submittedVocab[1].children;
  firstEntry[4].click();

  //Saves dictionary
  saveDictionaryToFile();
}

function kanjiEntered(){
  //Gets information for submitted kanji
  let submittedKanji = document.querySelector("#enterKanji").children;
  
  for (const k of submittedKanji) {
    if(k.className == "kanjiEntry"){
      let kanjiEntry = k.children;
      //Creates arrays for kun and on readings
      let kunReadings = kanjiEntry[2].value.split(",");
      let onReadings = kanjiEntry[1].value.split(",");
    
      //Adds new kanji based on submitted info
      addNewKanji(kanjiEntry[0].value, kunReadings, onReadings, kanjiEntry[3].value);

    }
  }
  
  //Removes all inputs
  for(let i = submittedKanji.length - 1; i > 1; i--){
    let kanjiEntry = submittedKanji[i].children;

    //Presses remove entry
    kanjiEntry[4].click();
  }

  addVocabInput();

  let firstEntry = submittedKanji[1].children;
  firstEntry[4].click();

  //Saves dictionary
  saveDictionaryToFile();
}

function addVocabInput(){
  //Creates div
  let inputDiv = document.createElement("div");
  inputDiv.className = "vocabEntry";

  //Creates input string with entry html
  let inputString = "<input class='vocabKanji' type='text' size='20' maxlength='20' />"
  inputString += "<input class='vocabHirakata' type='text' size='20' maxlength='20' />"
  inputString += "<input class='vocabEnglish' type='text' size='20' maxlength='40' />"
  inputString += "<select name='Part Of Speech' id='vocabPos'>"
  inputString += "<option value='noun'>Noun</option>"
  inputString += "<option value='vrb-u'>U Verb</option>"
  inputString += "<option value='vrb-ru'>Ru Verb</option>"
  inputString += "<option value='vrb-irr'>Irr Verb</option>"
  inputString += "<option value='adj-na'>Na Adj</option>"
  inputString += "<option value='adj-i'>I Adj</option>"
  inputString += "</select>"

  //Sets input div's inner html to the input string
  inputDiv.innerHTML = inputString;

  //Creates remove input button
  let removeButton = document.createElement("button");
  removeButton.className = "removeButton redButton";
  removeButton.innerText = "Remove"

  //Removes current input field when pressed
  removeButton.onclick = removeInput;

  //Appends button to input div
  inputDiv.appendChild(removeButton);

  //Appends input div
  document.querySelector("#enterVocab").appendChild(inputDiv);
}

function addKanjiInput(){
  //Creates div
  let inputDiv = document.createElement("div");
  inputDiv.className = "kanjiEntry";

  //Creates input string with entry html
  let inputString = "<input class='kanjiCharacter' type='text' size='20' maxlength='20' />"
  inputString += "<input class='kanjiOn' type='text' size='20' maxlength='20' />"
  inputString += "<input class='kanjiKun' type='text' size='20' maxlength='20' />"
  inputString += "<input class='kanjiEnglish' type='text' size='20' maxlength='35' />"

  //Sets input div's inner html to the input string
  inputDiv.innerHTML = inputString;

  //Creates remove input button
  let removeButton = document.createElement("button");
  removeButton.className = "removeButton redButton";
  removeButton.innerText = "Remove"

  //Removes current input field when pressed
  removeButton.onclick = removeInput;

  //Appends button to input div
  inputDiv.appendChild(removeButton);
  //Appends input div
  document.querySelector("#enterKanji").appendChild(inputDiv);

}

function removeInput(e){
  //Gets parent of clicked element
  let inputDiv = e.target.parentElement;

  //Gets all inputs from div
  let allInputs = inputDiv.parentElement.children;

  //If there is at least 2 inputs
  if(allInputs.length > 2){
    //Removes current input
    inputDiv.remove();
  }
}

function getVocabByString(_string, _partsOfSpeech, _date){
  //Array of matching indexes
  let matchingIndexes = [];

  //Stored search key
  let searchKey = vocabPrefix + _string;
  let storedResults = localStorage.getItem(searchKey);
  let storedObj;

  //Checks to see if search is stored 
  if(storedResults){
    //Returns array of stored results
    let storedObj = JSON.parse(storedResults);
    console.log(storedObj);
  }

  //If the stored results exist and are up to date
  if(storedObj && storedObj.count == jpDict.vocab.count){
    //Returns stored results
    return storedObj.results;
  }
  else{
    //Loops through vocab dictionary
    for (let i = 0; i < jpDict.vocab.count; i++) {
      let v  = jpDict.vocab.dict[i];
      let currentEntryTime = Date.parse(v.entryTime);

      //If the date is older than the passed in date, the loop stops
      if(_date && currentEntryTime < _date){
        break;
      }
      if(v.kanji.includes(_string) || v.hirakata.includes(_string) || v.english.includes(_string)){
        //If the part of speech matches or isn't required, the index gets pushed in
        if((_partsOfSpeech && _partsOfSpeech.includes(v.pos)) || !_partsOfSpeech){
          matchingIndexes.push(i);
        }
      }
    }

    //If there are any results
    if(matchingIndexes.length > 0){
      //Creates search object to store
      let newObj = {count: jpDict.vocab.count, results: matchingIndexes};
      try {
        //Stores search results locally
        localStorage.setItem(searchKey, JSON.stringify(newObj));
      }
      catch(err) {
        //Prints error message
        console.log(err.message);
        //In case of a quota exceeded error
        if(err.code == 22){
          //Clears local storage
          localStorage.clear();
        }
      }
    }
    return matchingIndexes;
  }
}

function getKanjiByString(_string, _date){
  //Array of matching indexes
  let matchingIndexes = [];

  //Stored search key
  let searchKey = kanjiPrefix + _string;
  let storedResults = localStorage.getItem(searchKey);
  let storedObj;

  //Checks to see if search is stored 
  if(storedResults){
    //Returns array of stored results
    let storedObj = JSON.parse(storedResults);
    console.log(storedObj);
  }

  //If the stored results exist and are up to date
  if(storedObj && storedObj.count == jpDict.kanji.count){
    //Returns stored results
    return storedObj.results;
  }
  else{
    let includesString = (e) => { return e.includes(_string)};
    //Loops through kanji dictionary
    for (let i = 0; i < jpDict.kanji.count; i++) {
      let k  = jpDict.kanji.dict[i];
      let currentEntryTime = k.entryTime;

      //If the date is older than the passed in date, the loop stops
      if(_date && currentEntryTime < _date){
        break;
      }
      if(k.character.includes(_string) || k.kun.some(includesString) || k.on.some(includesString) || k.english.includes(_string)){
        matchingIndexes.push(i);
      }
    }

    if(matchingIndexes.length > 0){
      //Creates search object to store
      let newObj = {count: jpDict.vocab.count, results: matchingIndexes};
      try {
        //Stores search results locally
        localStorage.setItem(searchKey, JSON.stringify(newObj));
      }
      catch(err) {
        //Prints error message
        console.log(err.message);
        //In case of a quota exceeded error
        if(err.code == 22){
          //Clears local storage
          localStorage.clear();
        }
      }
    }
    return matchingIndexes;
  }
  
}

function getOldestVocabForDate(_date){
  //Variable to store oldest index
  let oldestIndex;
  //Gets dates
  let dateObj = Date.parse(_date).getTime();
  let firstEntryDate = Date.parse(getVocabByIndex(0).entryTime).getTime();
  let lastEntryDate = Date.parse(getVocabByIndex(jpDict.vocab.count - 1).entryTime).getTime();

  //Checks to see if passed in date is within entry times
  if(dateObj > firstEntryDate && dateObj < lastEntryDate){
    //If the difference 
    if(dateObj - firstEntryDate >= lastEntryDate - dateObj){
      //Loops through dictionary from beginning
      for(let i = 0; i < jpDict.vocab.count; i++){
        let currentEntryTime = getVocabByIndex(i).entryTime;
        if(Date.parse(currentEntryTime).getTime() >= dateObj){
          oldestIndex = i;
        }
      }
    }
    else{
      //Loops through dictionary from end
      for(let i = jpDict.vocab.count - 1; i >= 0; i--){
        let currentEntryTime = getVocabByIndex(i).entryTime;

        if(Date.parse(currentEntryTime).getTime() < dateObj){
          oldestIndex = i + 1 < jpDict.vocab.count ? i + 1: i;
        }
      }
    }

    return oldestIndex;
  }
  else{
    console.log("invalid Date!");
  }  
}

function changeState(e){
  //Clears all states
  for(let i=0; i < 8; i++){
    allStates[i].style.display = "none";
  }
  let newState = e.target.dataset.stateindex;
  

  //Unique state setup
  if(newState == 3){
    //Gets part of speech array from element
    let pos = e.target.dataset.pos.split(';');

    //Gets list of eligible entries
    let entryList = getVocabList(pos);

    //Displays list
    displayVocabList(entryList);
  }
  else if(newState == 4){
    //Gets list of kanji
    let entryList = getKanjiList();

    //Displays list
    displayKanjiList(entryList);
  }
  else if(newState == 0){
    //Gets list of vocab inputs
    let vocabInputs = document.querySelectorAll(".vocabEntry");

    //If there are multiple input fields, remove all but one
    if(vocabInputs.length > 1){
      for(let i = 1; i < vocabInputs.length; i++){
        vocabInputs[i].querySelector(".removeButton").click();
      }
    }
    //Gets list of kanji inputs
    let kanjiInputs = document.querySelectorAll(".kanjiEntry");

    //If there are multiple input fields, remove all but one
    if(kanjiInputs.length > 1){
      for(let i = 1; i < kanjiInputs.length; i++){
        kanjiInputs[i].querySelector(".removeButton").click();
      }
    }

    isEditing = false;
    editButtonPushed = false;
    editVocab = "";
    editKanji = "";
  }

  else if(newState == 7){
    //Resets current card
    currentCard = 0;

    //Updates card information
    updateStudyCard();

    //Shows flashcards and hides end screen
    flashCardElement.style.display = "block";
    studyEndElement.style.display = "none";
  }

  //Sets new state
  allStates[parseInt(newState)].style.display = stateStyles[newState];
}

function toNextCard(){
  //Increases current card by one
  currentCard++;

  //Checks to see if it is greater than the total card count
  if(currentCard >= kanjiCount + vocabCount){
    //Sets current card equal to the card count
    currentCard = kanjiCount + vocabCount;

    //Hides flashcards and shows end screen
    flashCardElement.style.display = "none";
    studyEndElement.style.display = "flex";
  }
  else{
    //Updates card information
    updateStudyCard();
  }
}

function toPreviousCard(){
  if(currentCard > 0){
    //Decreases current card by one
    currentCard--;

    //Shows flashcards and hides end screen
    flashCardElement.style.display = "block";
    studyEndElement.style.display = "none";

    //Updates card information
    updateStudyCard();
  }
}

function updateStudyCard(){
  //Shows back of card if it is flipped and front of card if not
  if(entriesToStudy[currentCard].flipped){
    cardInfo[0].parentElement.style.display = "none";
    cardInfo[2].parentElement.style.display = "block";
  }
  else{
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
  if(entriesToStudy[currentCard].type == "vocab"){
    //Gets vocab entry
    let vocabEntry = getVocabByIndex(entriesToStudy[currentCard].index);
    if(vocabEntry.kanji){
      cardInfo[vocabArrangement[0]].innerText = vocabEntry.kanji;
      cardInfo[vocabArrangement[1]].innerText = vocabEntry.hirakata;
    }
    else{
      cardInfo[vocabArrangement[1]].innerText = "";
      cardInfo[vocabArrangement[0]].innerText = vocabEntry.hirakata;
    }
    
    cardInfo[vocabArrangement[2]].innerText = vocabEntry.english;

    //Updates vocab and kanji count elements
    vocabCountElement.innerText = "Vocab: " + (currentCard + 1) + "/" + vocabCount;
    kanjiCountElement.innerText = "Kanji: " + "0/" + kanjiCount;
  }
  else if(entriesToStudy[currentCard].type == "kanji"){
    //Gets vocab entry
    let kanjiEntry = getKanjiByIndex(entriesToStudy[currentCard].index);
    cardInfo[kanjiArrangement[0]].innerText = kanjiEntry.character;
    cardInfo[kanjiArrangement[1]].innerText = "On: " + kanjiEntry.on + "\n" + " Kun: " + kanjiEntry.kun;
    cardInfo[kanjiArrangement[2]].innerText = kanjiEntry.english;

    //Updates vocab and kanji count elements
    vocabCountElement.innerText = "Vocab: " + vocabCount + "/" + vocabCount;
    kanjiCountElement.innerText = "Kanji: " + (currentCard - vocabCount + 1) + "/" + kanjiCount;
  }
}
})();