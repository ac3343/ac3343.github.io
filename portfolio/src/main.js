(function(){
  let projectDescription,projectImage,allProjects;
  const AllProjectsLink = "portfolio/projects/all";
  window.onload = (e) => {
    projectDescription = document.querySelector(".projectDescription");
    projectImage = document.querySelector(".projectItem").querySelector("img");

    loadXMLDoc(AllProjectsLink,loadAllProjects);
  };

  function loadXMLDoc(file,onDataLoad) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {        
        onDataLoad(JSON.parse(this.responseText))
      }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
  }

  function loadProject(project){
    projectDescription.querySelector("h2").innerHTML = project.title;
    projectDescription.querySelector("h3").innerHTML = project.technRole;
    projectDescription.querySelector("p").innerHTML = project.description;
    projectDescription.querySelector("a").href = project.link;
    projectImage.src = project.image;
    projectImage.alt = project.title;
  }

  function loadAllProjects(projects){
    allProjects = projects.project;
    let projImages = document.querySelectorAll(".projectImage");

    for(let i = 0; i < allProjects.length; i++){
      let currentImage = projImages[i];
      let currentProject = allProjects[i];
      currentImage.hidden = false;
      currentImage.dataset.index = i;
      currentImage.style = `background-image: url(${currentProject.image});`;
    }

    loadProject(allProjects[0]);

    for (const p of projImages) {
      p.onclick = (e)=>{loadProject(allProjects[e.target.dataset.index]);};
    }
  }
}());


