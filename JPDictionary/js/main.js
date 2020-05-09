(function(){
let jpDict = "";
let dictFIle = "php/dic/all_dic";
let testDictFile = "dic/test_dict";

loadDictionary();
document.onkeypress = (e) => {
  addNewVocab("留学する", "りゅがくする", "to study abroad", "vrb-irr");
  addNewKanji("夜", ["よる", "よ"], ["や"], "night");

  //console.log(jpDict);
  
  editKanjiEntry(1, "鳥", ["とり"], ["ちょう"], "bird");
  editVocabEntry(0, "近い", "ちかい", "close;near", "adj-i");



  console.log(jpDict);
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
    console.log("Error! Index out " +  _index +" of bounds. Vocab dict only has " + jpDict.vocab.count + " entries.");
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
    console.log("Error! Index out " +  _index +" of bounds. Kanji dict only has " + jpDict.kanji.count + " entries.");
  }
}
})();