import * as ajax from "./ajax.js";
import * as study from "./study.js";
import * as storage from "./localstorage.js";


//Declares dictionary object
let jpDict;
const SAVE_URL = "php/test.php";
const DOWNLOAD_URL = "php/dic/all_dic";

//Local Storage Fields
const prefix = "jpDict-";
const vocabPrefix = prefix + "vocab-";
const kanjiPrefix = prefix + "kanji-";

//Entry Editing variables
let isEditing, editButtonPushed;
let editVocab = "";
let editKanji = "";

let vocabEntriesElement, kanjiEntriesElement;

function init() {
    //Declares dictionary object
    jpDict = " ";
    editVocab = "";
    editKanji = "";
    loadDictionary();
    //Entry Editing variables
    isEditing, editButtonPushed = false;
    setupUI();
}

function setupUI() {
    document.querySelector("#submitVocab").onclick = vocabEntered;
    document.querySelector("#submitKanji").onclick = kanjiEntered;
    document.querySelector("#addVocabEntry").onclick = addVocabInput;
    document.querySelector("#addKanjiEntry").onclick = addKanjiInput;
    vocabEntriesElement = document.querySelector("#vocabEntries");
    kanjiEntriesElement = document.querySelector("#kanjiEntries");
  let searchButtons = document.querySelectorAll(".search");


    let vocabEditButton = document.querySelector("#vocabEdit");
    vocabEditButton.onclick = (e) => {
        //Toggles edit mode
        editButtonPushed = !editButtonPushed;

        //Changes border color for all entries
        if (editButtonPushed) {
            for (const v of vocabEntriesElement.children) {
                vocabEntriesElement.style.borderColor = "#0E652B";
                v.style.borderColor = "#0E652B";
            }

            vocabEditButton.style.backgroundColor = "#0E652B";
            vocabEditButton.style.color = "#D3D4D9";

        }
        else {
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
    kanjiEditButton.onclick = (e) => {
        //Toggles edit mode
        editButtonPushed = !editButtonPushed;

        //Changes border color for all entries
        if (editButtonPushed) {
            for (const v of kanjiEntriesElement.children) {
                kanjiEntriesElement.style.borderColor = "#0E652B";
                v.style.borderColor = "#0E652B";
            }

            kanjiEditButton.style.backgroundColor = "#0E652B";
            kanjiEditButton.style.color = "#D3D4D9";
        }
        else {
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
    saveVocabEdit.onclick = (e) => {
        if (isEditing) {
            let vocabInfo = editVocab.querySelectorAll("textarea");
            //console.log(vocabInfo);
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
    saveKanjiEdit.onclick = (e) => {
        if (isEditing) {
            let kanjiInfo = editKanji.querySelectorAll("textarea");
            //console.log(kanjiInfo);
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
    deleteVocabEdit.onclick = (e) => {
        if (isEditing) {
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
    deleteKanjiEdit.onclick = (e) => {
        if (isEditing) {
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
    let removeButtons = document.querySelectorAll(".removeButton");
    for (const b of removeButtons) {
        b.onclick = removeInput;
    }
}

function loadDictionary() {
    ajax.downloadFile(DOWNLOAD_URL, function (json) {
        jpDict = JSON.parse(json);
    });
}

function saveDictionaryToFile() {
    ajax.saveFile(SAVE_URL);
}

function addNewVocab(_kanji, _hirakata, _english, _pos) {
    //Creates new vocab object
    let newVocab = new Vocab(_kanji, _hirakata, _english, _pos, new Date());

    //Checks to see if jpDict exists
    if (jpDict) {
        //Pushes vocab into dictionary
        jpDict.vocab.dict.push(newVocab);

        //Increases vocab count
        jpDict.vocab.count++;

        //console.log("Successfully added new vocab");
    }
    else {
        console.log("Error! jpDict not initialized");
    }
}

function addNewKanji(_character, _kun, _on, _english) {
    //Creates new kanji object
    let newKanji = new Kanji(_character, _kun, _on, _english, new Date());

    //Checks to see if jpDict exists
    if (jpDict) {
        //Pushes kanji into dictionary
        jpDict.kanji.dict.push(newKanji);

        //Increases kanji count
        jpDict.kanji.count++;

        //console.log("Successfully added new kanji");
    }
    else {
        console.log("Error! jpDict not initialized");
    }
}

function removeVocabAtIndex(_index) {
    //Checks to see if index is within dictionary count
    if (_index < jpDict.vocab.count && _index >= 0) {
        //Removes at index
        jpDict.vocab.dict.splice(_index, 1);

        //Decreases vocab count
        jpDict.vocab.count--;

        //console.log("Successfully removed vocab at " + _index);
    }
    else {
        console.log("Error! Index out " + _index + " of bounds. Vocab dict only has " + jpDict.vocab.count + " entries.");
    }
}

function removeKanjiAtIndex(_index) {
    //Checks to see if index is within dictionary count
    if (_index < jpDict.kanji.count && _index >= 0) {
        //Removes at index
        jpDict.kanji.dict.splice(_index, 1);

        //Decreases kanji count
        jpDict.kanji.count--;

        //console.log("Successfully removed kanji at " + _index);
    }
    else {
        console.log("Error! Index out " + _index + " of bounds. Kanji dict only has " + jpDict.kanji.count + " entries.");
    }
}

function editVocabEntry(_index, _kanji, _hirakata, _english) {
    //Checks to see if index is within dictionary count
    if (_index < jpDict.vocab.count && _index >= 0) {
        //Edits entry at index
        jpDict.vocab.dict[_index].kanji = _kanji;
        jpDict.vocab.dict[_index].hirakata = _hirakata;
        jpDict.vocab.dict[_index].english = _english;

        //console.log("Edited vocab entry at" + _index);
    }
    else {
        console.log("Error! Index " + _index + " out  of bounds. Vocab dict only has " + jpDict.vocab.count + " entries.");
    }
}

function editKanjiEntry(_index, _character, _kun, _on, _english) {
    //Checks to see if index is within dictionary count
    if (_index < jpDict.kanji.count && _index >= 0) {
        //Edits entry at index
        jpDict.kanji.dict[_index].character = _character;
        jpDict.kanji.dict[_index].kun = _kun;
        jpDict.kanji.dict[_index].on = _on;
        jpDict.kanji.dict[_index].english = _english;

        //console.log("Edited kanji entry at " + _index);
    }
    else {
        console.log("Error! Index " + _index + " out  of bounds. Kanji dict only has " + jpDict.kanji.count + " entries.");
    }
}

function vocabEntered() {
    //Gets array of submitted vocab
    let submittedVocab = document.querySelector("#enterVocab").children;

    //Loops through submitted vocab
    for (const v of submittedVocab) {
        if (v.className == "vocabEntry") {
            let vocabEntry = v.children;

            //Adds new vocab based on submitted info
            addNewVocab(vocabEntry[0].value, vocabEntry[1].value, vocabEntry[2].value, vocabEntry[3].value);
        }
    }

    //Removes all inputs
    for (let i = submittedVocab.length - 1; i > 1; i--) {
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

function kanjiEntered() {
    //Gets information for submitted kanji
    let submittedKanji = document.querySelector("#enterKanji").children;

    for (const k of submittedKanji) {
        if (k.className == "kanjiEntry") {
            let kanjiEntry = k.children;
            //Creates arrays for kun and on readings
            let kunReadings = kanjiEntry[2].value.split(",");
            let onReadings = kanjiEntry[1].value.split(",");

            //Adds new kanji based on submitted info
            addNewKanji(kanjiEntry[0].value, kunReadings, onReadings, kanjiEntry[3].value);

        }
    }

    //Removes all inputs
    for (let i = submittedKanji.length - 1; i > 1; i--) {
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

function getVocabByIndex(_index) {
    if (_index < jpDict.vocab.count && _index >= 0) {
        return jpDict.vocab.dict[_index];
    }
    else {
        console.log("Error! Index " + _index + " out  of bounds. Vocab dict only has " + jpDict.vocab.count + " entries.");
    }

}

function getKanjiByIndex(_index) {
    if (_index < jpDict.kanji.count && _index >= 0) {
        return jpDict.kanji.dict[_index];
    }
    else {
        console.log("Error! Index " + _index + " out  of bounds. Kanji dict only has " + jpDict.kanji.count + " entries.");
    }
}

function getVocabList(_partsOfSpeech, _date, _numberOfEntries = jpDict.vocab.count) {
    //Array of indexes
    let indexes = [];

    //Starts loop at most recent dictionary entry.
    let i = jpDict.vocab.count - 1;
    //Runs until the entire dictionary has been searched or the number of entries has been fulfilled
    while (indexes.length < _numberOfEntries && i >= 0) {
        //Gets current entry and current entry time
        let currentEntry = getVocabByIndex(i);
        let currentEntryTime = Date.parse(currentEntry.entryTime);

        //If the date is older than the passed in date, the loop stops
        if (_date && currentEntryTime < _date) {
            break;
        }
        //If the part of speech matches or isn't required, the index gets pushed in
        if ((_partsOfSpeech && _partsOfSpeech.includes(currentEntry.pos)) || !_partsOfSpeech) {
            indexes.push(i);
        }
        //Iterates i
        i--;
    }

    //Returns array of indexes
    return indexes;
}

function getKanjiList(_date, _numberOfEntries = jpDict.kanji.count) {
    //Array of indexes
    let indexes = [];

    //Starts loop at most recent dictionary entry.
    let i = jpDict.kanji.count - 1;
    //Runs until the entire dictionary has been searched or the number of entries has been fulfilled
    while (indexes.length < _numberOfEntries && i >= 0) {
        //Gets current entry and current entry time
        let currentEntry = getKanjiByIndex(i);
        let currentEntryTime = Date.parse(currentEntry.entryTime);

        //If the date is older than the passed in date, the loop stops
        if (_date && currentEntryTime < _date) {
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
function getRandomVocabList(_partsOfSpeech, _date, _numberOfEntries = 1) {
    //Array of indexes
    let indexes = [];

    //Available indexes from dictionary keys
    let availableIndexes = Object.keys(jpDict.vocab.dict);


    //Runs until the entire dictionary has been searched or the number of entries has been fulfilled
    while (indexes.length < _numberOfEntries && availableIndexes.length > 0) {
        //Randomly generates index
        let i = Math.floor(Math.random() * availableIndexes.length);
        let selectedIndex = parseInt(availableIndexes[i]);

        //Gets current entry and current entry time
        let currentEntry = getVocabByIndex(selectedIndex);
        let currentEntryTime = Date.parse(currentEntry.entryTime);

        //If the entry is newer than the requested date and the part of speech matches or isn't required
        if (((_date && currentEntryTime >= _date) || !_date) && ((_partsOfSpeech && _partsOfSpeech.includes(currentEntry.pos)) || !_partsOfSpeech)) {
            //Adds selected index
            indexes.push(selectedIndex);
        }

        //Removes selected index from available indexes
        availableIndexes.splice(i, 1);
    }

    //Returns array of indexes
    return indexes;
}

function getRandomKanjiList(_date, _numberOfEntries = 1) {
    //Array of indexes
    let indexes = [];

    //Available indexes from dictionary keys
    let availableIndexes = Object.keys(jpDict.kanji.dict);


    //Runs until the entire dictionary has been searched or the number of entries has been fulfilled
    while (indexes.length < _numberOfEntries && availableIndexes.length > 0) {
        //Randomly generates index
        let i = Math.floor(Math.random() * availableIndexes.length);
        let selectedIndex = parseInt(availableIndexes[i]);

        //Gets current entry and current entry time
        let currentEntry = getKanjiByIndex(selectedIndex);
        let currentEntryTime = Date.parse(currentEntry.entryTime);

        //If the entry is newer than the requested date and the part of speech matches or isn't required
        if (((_date && currentEntryTime >= _date) || !_date)) {
            //Adds selected index
            indexes.push(selectedIndex);
        }

        //Removes selected index from available indexes
        availableIndexes.splice(i, 1);
    }

    //Returns array of indexes
    return indexes;
}
function getVocabByString(_string, _partsOfSpeech, _date) {
    //Array of matching indexes
    let matchingIndexes = [];

    //Stored search key
    let searchKey = vocabPrefix + _string;
    let storedObj = storage.getStoredData(searchKey);

    /*
    //Checks to see if search is stored 
    if (storedResults) {
      //Returns array of stored results
      let storedObj = JSON.parse(storedResults);
      //console.log(storedObj);
    }
    */
    //If the stored results exist and are up to date
    if (storedObj && storedObj.count == jpDict.vocab.count) {
        //Returns stored results
        return storedObj.results;
    }
    else {
        //Loops through vocab dictionary
        for (let i = 0; i < jpDict.vocab.count; i++) {
            let v = jpDict.vocab.dict[i];
            let currentEntryTime = Date.parse(v.entryTime);

            //If the date is older than the passed in date, the loop stops
            if (_date && currentEntryTime < _date) {
                break;
            }
            if (v.kanji.includes(_string) || v.hirakata.includes(_string) || v.english.includes(_string)) {
                //If the part of speech matches or isn't required, the index gets pushed in
                if ((_partsOfSpeech && _partsOfSpeech.includes(v.pos)) || !_partsOfSpeech) {
                    matchingIndexes.push(i);
                }
            }
        }

        //If there are any results
        if (matchingIndexes.length > 0) {
            //Creates search object to store
            let newObj = { count: jpDict.vocab.count, results: matchingIndexes };
            try {
                //Stores search results locally
                storage.storeData(searchKey, newObj);
            }
            catch (err) {
                //Prints error message
                console.log(err.message);
                //In case of a quota exceeded error
                if (err.code == 22) {
                    //Clears local storage
                    localStorage.clear();
                }
            }
        }
        return matchingIndexes;
    }
}

function getKanjiByString(_string, _date) {
    //Array of matching indexes
    let matchingIndexes = [];

    //Stored search key
    let searchKey = kanjiPrefix + _string;
    let storedObj = storage.getStoredData(searchKey);

    /*
    //Checks to see if search is stored 
    if (storedResults) {
      //Returns array of stored results
      let storedObj = JSON.parse(storedResults);
      //console.log(storedObj);
    }
    */

    //If the stored results exist and are up to date
    if (storedObj && storedObj.count == jpDict.kanji.count) {
        //Returns stored results
        return storedObj.results;
    }
    else {
        let includesString = (e) => { return e.includes(_string) };
        //Loops through kanji dictionary
        for (let i = 0; i < jpDict.kanji.count; i++) {
            let k = jpDict.kanji.dict[i];
            let currentEntryTime = k.entryTime;

            //If the date is older than the passed in date, the loop stops
            if (_date && currentEntryTime < _date) {
                break;
            }
            if (k.character.includes(_string) || k.kun.some(includesString) || k.on.some(includesString) || k.english.includes(_string)) {
                matchingIndexes.push(i);
            }
        }

        if (matchingIndexes.length > 0) {
            //Creates search object to store
            let newObj = { count: jpDict.vocab.count, results: matchingIndexes };
            try {
                //Stores search results locally
                storage.storeData(searchKey, newObj);
            }
            catch (err) {
                //Prints error message
                console.log(err.message);
                //In case of a quota exceeded error
                if (err.code == 22) {
                    //Clears local storage
                    localStorage.clear();
                }
            }
        }
        return matchingIndexes;
    }

}
function getOldestVocabForDate(_date) {
    //Variable to store oldest index
    let oldestIndex;
    //Gets dates
    let dateObj = Date.parse(_date).getTime();
    let firstEntryDate = Date.parse(getVocabByIndex(0).entryTime).getTime();
    let lastEntryDate = Date.parse(getVocabByIndex(jpDict.vocab.count - 1).entryTime).getTime();

    //Checks to see if passed in date is within entry times
    if (dateObj > firstEntryDate && dateObj < lastEntryDate) {
        //If the difference 
        if (dateObj - firstEntryDate >= lastEntryDate - dateObj) {
            //Loops through dictionary from beginning
            for (let i = 0; i < jpDict.vocab.count; i++) {
                let currentEntryTime = getVocabByIndex(i).entryTime;
                if (Date.parse(currentEntryTime).getTime() >= dateObj) {
                    oldestIndex = i;
                }
            }
        }
        else {
            //Loops through dictionary from end
            for (let i = jpDict.vocab.count - 1; i >= 0; i--) {
                let currentEntryTime = getVocabByIndex(i).entryTime;

                if (Date.parse(currentEntryTime).getTime() < dateObj) {
                    oldestIndex = i + 1 < jpDict.vocab.count ? i + 1 : i;
                }
            }
        }

        return oldestIndex;
    }
    else {
        console.log("invalid Date!");
    }
}

function getVocabCount() {
    return jpDict.vocab.count;
}
function getKanjiCount() {
    return jpDict.kanji.count;
}

function resetEditingFields() {
    isEditing = false;
    editButtonPushed = false;
    editVocab = "";
    editKanji = "";
}

function displayVocab(_index) {
    //Gets vocab entry
    let vocabEntry = getVocabByIndex(_index);

    if (vocabEntry) {
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

function displayKanji(_index) {
    //Gets kanji entry
    let kanjiEntry = getKanjiByIndex(_index);

    if (kanjiEntry) {
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

function displayVocabList(_indexArray) {
    //Creates string to contain elements
    let entriesString = "";

    //Loops through indexes in index array
    for (const i of _indexArray) {
        //Gets vocab element
        let vocabElement = displayVocab(i);

        if (vocabElement) {
            //Adds element of vocab entry i to entries string
            entriesString += vocabElement;
        }

    }

    //Sets inner html of entries element to the big string
    vocabEntriesElement.innerHTML = entriesString;

    for (const v of vocabEntriesElement.children) {

        study.entryInit("vocab", v);

        v.onclick = (e) => {
            if (editButtonPushed && !isEditing) {
                //Resets all other border colors
                for (const w of vocabEntriesElement.children) {
                    if (w != v) {
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
            else if (!isEditing) {
                study.entryOnClick("vocab", v);
            }
        }
    }
}

function displayKanjiList(_indexArray) {
    //Creates string to contain elements
    let entriesString = "";

    //Loops through indexes in index array
    for (const i of _indexArray) {
        //Gets kanji element
        let kanjiElement = displayKanji(i);

        if (kanjiElement) {
            //Adds element of kanji entry i to entries string
            entriesString += displayKanji(i);
        }

    }

    //Sets inner html of entries element to the big string
    kanjiEntriesElement.innerHTML = entriesString;

    for (const k of kanjiEntriesElement.children) {
        //Changes background color if k is already selected
        study.entryInit("kanji", k)
        //Toggles entry selection when they are pressed
        k.onclick = (e) => {
            if (editButtonPushed && !isEditing) {
                //Resets all other border colors
                for (const w of kanjiEntriesElement.children) {
                    if (w != k) {
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
            else if (!isEditing) {
                study.entryOnClick("kanji", k)
            }

        }
    }
}

function addVocabInput() {
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
    inputString += "<option value='adverb'>Adverb</option>"
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

function addKanjiInput() {
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

function removeInput(e) {
    //Gets parent of clicked element
    let inputDiv = e.target.parentElement;

    //Gets all inputs from div
    let allInputs = inputDiv.parentElement.children;

    //If there is at least 2 inputs
    if (allInputs.length > 2) {
        //Removes current input
        inputDiv.remove();
    }
}

export { init, getVocabCount, getKanjiCount, resetEditingFields, getVocabByIndex, getKanjiByIndex, getVocabList, getKanjiList, getRandomVocabList, getRandomKanjiList, getVocabByString, getKanjiByString, displayVocabList, displayKanjiList };