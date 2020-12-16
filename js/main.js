var $profileForm = document.querySelector('.profile-form');
var $profileName = document.querySelector('.profile-name')

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
