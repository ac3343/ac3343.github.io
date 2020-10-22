(function(){
  window.onload = (e) => {
    let projects = document.querySelectorAll(".projectImage");
    let projectDescription = document.querySelector(".projectDescription");
    let projectImage = document.querySelector(".projectItem").querySelector("img");

    for (const p of projects) {
        if(p.dataset.file){
            p.onclick = loadXMLDoc;
        }
    }

    function loadXMLDoc(e) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let project = JSON.parse(this.responseText);
          
          projectDescription.querySelector("h2").innerHTML = project.title;
          projectDescription.querySelector("h3").innerHTML = project.technRole;
          projectDescription.querySelector("p").innerHTML = project.description;
          projectDescription.querySelector("a").href = project.link;
          projectImage.src = project.image;
          projectImage.alt = project.title;
        }
      };
      xhttp.open("GET", e.target.dataset.file, true);
      xhttp.send();
    }
  };
  
}());


