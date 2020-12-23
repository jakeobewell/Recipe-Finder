/* exported data */
var data = {
  username: '',
  favorites: []
}

var currentData = {};

if (JSON.parse(localStorage.getItem('project-local-storage')) !== null) {
 currentData = JSON.parse(localStorage.getItem('project-local-storage'));
}

window.addEventListener('beforeunload', function (event) {
  var currentDataJSON = JSON.stringify(currentData);
  localStorage.setItem('project-local-storage', currentDataJSON);
})
