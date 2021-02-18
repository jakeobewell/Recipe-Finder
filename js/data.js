/* exported data */
let data = {
  favorites: []
}

let currentData = {};

if (JSON.parse(localStorage.getItem('project-local-storage')) !== null) {
 currentData = JSON.parse(localStorage.getItem('project-local-storage'));
}

window.addEventListener('beforeunload', function (event) {
  let currentDataJSON = JSON.stringify(currentData);
  localStorage.setItem('project-local-storage', currentDataJSON);
})
