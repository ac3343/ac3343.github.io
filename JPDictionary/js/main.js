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
      
      //If search is not any empty string
      if(search){
        //Gets list of matching entries
        matchingEntries = getVocabByString(search);
      }
  
      //If there are no matching entries, get the entire vocab list
      if(!matchingEntries || matchingEntries == []){
        matchingEntries = getVocabList();
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
      matchingEntries = getKanjiByString(search);
    }

    //If there are no matching entries, get the entire vocab list
    if(!matchingEntries || matchingEntries == []){
      matchingEntries = getKanjiList();
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

  searchButtons[1].onclick = (e) =>{
    //Gets search bar text
    let search = searchFields[1].value;

    //Creates matching entries array
    let matchingEntries;

    //If search is not any empty string
    if(search){
      //Gets list of matching entries
      matchingEntries = getKanjiByString(search);
    }

    //If there are no matching entries, get the entire vocab list
    if(!matchingEntries || matchingEntries == []){
      matchingEntries = getKanjiList();
    }

    //Displays matching entries entries
    displayKanjiList(matchingEntries);
  };

  let removeButtons = document.querySelectorAll(".removeButton");
  for (const b of removeButtons) {
    b.onclick = removeInput;
  }
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
let vocabFiltersApplied = false;
let kanjiFiltersApplied = false;



loadDictionary();
document.onkeypress = (e) => {
  //addNewVocab("留学する", "りゅがくする", "to study abroad", "vrb-irr");
  //addNewKanji("夜", ["よる", "よ"], ["や"], "night");

  //console.log(jpDict);
  
  //editKanjiEntry(1, "鳥", ["とり"], ["ちょう"], "bird");
  //editVocabEntry(0, "近い", "ちかい", "close;near", "adj-i");

  //displayVocabList([0, 1, 2, 4]);

  //console.log(getVocabList());
  //console.log(getKanjiList(5, new Date(2020, 4, 2)));

  //console.log(getRandomVocabList(10, "", new Date(2020, 4, 4)));
  //console.log(getVocabByString("to"));
  //console.log(getKanjiByString("つ"));
};

//let testVocab = new Vocab("留学する", "りゅがくする", "to study abroad", "vrb-irr", new Date());

//let testKanji = new Kanji("夜", ["よる", "よ"], ["や"], "night", new Date());

//console.log(testVocab);
//console.log(testKanji);


function loadDictionary() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        jpDict = JSON.parse(this.responseText);

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

function editVocabEntry(_index, _kanji, _hirakata, _english, _pos){
  //Checks to see if index is within dictionary count
  if(_index < jpDict.vocab.count && _index >= 0){
    //Edits entry at index
    jpDict.vocab.dict[_index].kanji = _kanji;
    jpDict.vocab.dict[_index].hirakata = _hirakata;
    jpDict.vocab.dict[_index].english = _english;
    jpDict.vocab.dict[_index].pos = _pos;

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
    element += "' class = 'entry'> <p class='col1'>";
    element += vocabEntry.kanji;
    element += "</p><p class='col2'>";
    element += vocabEntry.hirakata;
    element += "</p><p class='col3'>";
    element += vocabEntry.pos;
    element += "</p><p class='col4'>";
    element += vocabEntry.english;
    element += "</p><p class='col5'>";
    let entryDate = new Date(vocabEntry.entryTime);
    element += entryDate.toLocaleString();
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
    element += "' class = 'entry'> <p class='col1'>";
    element += kanjiEntry.character;
    element += "</p><p class='col2'>";
    element += kanjiEntry.on;
    element += "</p><p class='col3'>";
    element += kanjiEntry.kun;
    element += "</p><p class='col4'>";
    element += kanjiEntry.english;
    element += "</p><p class='col5'>";
    let entryDate = new Date(kanjiEntry.entryTime);
    element += entryDate.toLocaleString();
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
}

function getVocabList(_partsOfSpeech, _numberOfEntries = jpDict.vocab.count, _date){
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

function getKanjiList(_numberOfEntries = jpDict.kanji.count, _date){
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

function getRandomVocabList(_numberOfEntries = 1, _partsOfSpeech, _date){
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

function getRandomKanjiList(_numberOfEntries = 1, _date){
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
  inputString += "<input class='vocabEnglish' type='text' size='20' maxlength='20' />"
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
  inputString += "<input class='kanjiEnglish' type='text' size='20' maxlength='20' />"

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

function getVocabByString(_string){
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
      if(v.kanji.includes(_string) || v.hirakata.includes(_string) || v.english.includes(_string)){
        matchingIndexes.push(i);
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

function getKanjiByString(_string){
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
  }

  //Sets new state
  allStates[parseInt(newState)].style.display = stateStyles[newState];
}
})();