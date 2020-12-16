var $profileForm = document.querySelector('.profile-form');
var $profileName = document.querySelector('.profile-name')
var $searchForm = document.querySelector('.search-form');

$profileForm.addEventListener('submit', function(event) {
  data.username = document.getElementById('user-name').value;
  if (data.username === '') {
    event.preventDefault();
    return;
  }

  $profileName.textContent = document.getElementById('user-name').value;

  var dataJSON = JSON.stringify(data);
  localStorage.setItem('project-local-storage', dataJSON);
  $profileForm.reset();
  changeView('search');
  event.preventDefault();
})

function changeView(view) {
  var $views = document.querySelectorAll('.display');

  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].className = 'display';
    }
    else {
      $views[i].className = 'hidden display';
    }
  }
}

$searchForm.addEventListener('submit', function(event) {
  var dish = document.getElementById('dish').value;
  var diet = document.getElementById('diet').value;
  var nutrition = document.getElementById('nutrition').value;
  if (diet !== "") {
    diet = '&health=' + document.getElementById('diet').value;
  }
  if (nutrition !== "") {
    nutrition = '&diet=' + document.getElementById('nutrition').value;
  }
  var xhr = new XMLHttpRequest();
  var _url = 'https://api.edamam.com/search?q=' + dish + '&app_id=4ec8f0b8&app_key=25713e68788fd4267505ef53ddc5081d' + diet + nutrition;

  xhr.open('GET', _url)
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
  });
  xhr.send();
  $searchForm.reset();
  changeView('recipe-list');
  event.preventDefault();
})
