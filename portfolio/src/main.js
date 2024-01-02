const app = new Vue({
  el: '#app',
  data: {
    projects: [],
    AllProjectsLink: "portfolio/projects/all",
    show: false,
    projectShow: [false, false, false, false, false, false],
    currentProject: {},
    detailView: false
  },
  methods: {
    loadXMLDoc(file, onDataLoad) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          onDataLoad(JSON.parse(this.responseText))
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
    },
    loadAllProjects(loadedProjects) {
      this.projects = loadedProjects.project;
      this.projects.sort((a,b)=> (a.pos - b.pos));
      this.projects.forEach(p => {
        p.imgsrc = p.image;
        p.hover = (isHovering) =>{
          if(isHovering){
            p.imgsrc = p.gif;
          }
          else{
            p.imgsrc = p.image;
          }
        }
      });
    },
    switchPage(projectIndex){
      this.detailView = !this.detailView;
      if(projectIndex != null){
        this.currentProject = this.projects[projectIndex];
      }
    }
  }, // end methods
  created: function () {
    this.loadXMLDoc(this.AllProjectsLink, this.loadAllProjects);
  }
});

