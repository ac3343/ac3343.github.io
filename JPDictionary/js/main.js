(function(){
let jpDict = "";
let dictFIle = "php/dic/all_dic";
let testDictFile = "dic/test_dict";
let entriesElement = document.querySelector("#entries");


loadDictionary();
document.onkeypress = (e) => {
  //addNewVocab("留学する", "りゅがくする", "to study abroad", "vrb-irr");
  //addNewKanji("夜", ["よる", "よ"], ["や"], "night");

  //console.log(jpDict);
  
  //editKanjiEntry(1, "鳥", ["とり"], ["ちょう"], "bird");
  //editVocabEntry(0, "近い", "ちかい", "close;near", "adj-i");

  displayVocabList([0, 1, 2, 4]);
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
        console.log(jpDict);
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
    element += vocabEntry.english;
    element += "</p><p class='col4'>";
    element += vocabEntry.pos;
    element += "</p><p class='col4'>";
    element += vocabEntry.entryTime;
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
    element += "</p><p class='col4'>";
    element += kanjiEntry.entryTime;
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
  entriesElement.innerHTML = entriesString;
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
  entriesElement.innerHTML = entriesString;
}

function getRandomVocabList(_numberOfEntries, _partOfSpeech, _date){
  //Array of indexes
  let indexes = [];

  //Array of checked indexes
  let checkedIndexes = [];

  
  let i = 0;
  while(i < _numberOfEntries && checkedIndexes.length < jpDict.vocab.count){

  }
}
})();