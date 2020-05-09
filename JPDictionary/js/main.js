let jpDict = "";
let dictFIle = "php/dic/all_dic";
let testDictFile = "dic/test_dict";

loadDictionary();
document.onkeypress = saveDictionaryToFile;




function loadDictionary() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        jpDict = JSON.parse(this.responseText);

        console.log(jpDict);

        console.log(jpDict.vocab.count);
        console.log(jpDict.vocab.dict[0].hirakata);
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