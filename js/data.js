/* exported data */
var data = {
  username: '',
  favorites: []
}

if (JSON.parse(localStorage.getItem('project-local-storage')) !== null) {
  var currentData = JSON.parse(localStorage.getItem('project-local-storage'));
}

window.addEventListener('beforeunload', function (event) {
  var currentDataJSON = JSON.stringify(currentData);
  localStorage.setItem('project-local-storage', currentDataJSON);
})
