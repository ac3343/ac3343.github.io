//Filter variables
let vocabFilterDate;
let kanjiFilterDate;
let studyFilterDate;

function init(){
    //Filter variables
  vocabFilterDate = "";
  kanjiFilterDate = "";
  studyFilterDate = "";
  setupUI();
}

function setupUI(){
    let vocabTimeFilters = document.querySelectorAll(".vocabTime");
    let kanjiTimeFilters = document.querySelectorAll(".kanjiTime");
    let studyTimeFilters = document.querySelectorAll(".studyTime");
  
    for (const f of vocabTimeFilters) {
      f.onclick = (e) => {
        //Gets current time and submitted time
        let now = new Date();
        let submittedTime = new Date();
  
        //Sets filter time based on selection
        switch (f.value) {
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
      f.onclick = (e) => {
        //Gets current time and submitted time
        let now = new Date();
        let submittedTime = new Date();
  
        //Sets filter time based on selection
        switch (f.value) {
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
      s.onclick = (e) => {
        //Gets current time and submitted time
        let now = new Date();
        let submittedTime = new Date();
  
        //Sets filter time based on selection
        switch (s.value) {
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

    allBoxes[0].onclick = (e) => {
      for (let i = 1; i < allBoxes.length; i++) {
        allBoxes[i].checked = allBoxes[0].checked;
      }
    }

    let multiSelectButtons = [2, 6];
    for (const i of multiSelectButtons) {
      allBoxes[i].onclick = (e) => {
        for (let j = 1; e.target.dataset.children >= j; j++) {
          allBoxes[i + j].checked = allBoxes[i].checked;
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

      if (allPos) {
        //Click it if it is checked and click it twice if it isn't
        allPos.click();
        if (allPos.checked) {
          allPos.click();
        }
      }
    };
  }
  
  let hideFilterButton = document.querySelectorAll(".filterButton");
  for (const b of hideFilterButton) {
    b.onclick = (e) => {
      //Toggles filter visibility
      let filterDiv = b.nextElementSibling;
      if (filterDiv.style.display == "none" || !filterDiv.style.display) {
        filterDiv.style.display = "grid";
      }
      else {
        filterDiv.style.display = "none";
      }
    };
  }
}
function getVocabFilerDate(){
    return vocabFilterDate;
}
function getKanjiFilterDate(){
    return kanjiFilterDate;
}
function getStudyFilterDate(){
    return studyFilterDate;
}
export {init, getVocabFilerDate,getStudyFilterDate,getKanjiFilterDate}