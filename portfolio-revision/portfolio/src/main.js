const app = new Vue({
  el: '#app',
  data: {
    projects: [],
    AllProjectsLink: "portfolio/projects/all",
    show: false
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
    }
  }, // end methods
  created: function () {
    this.loadXMLDoc(this.AllProjectsLink, this.loadAllProjects);
  }
});

