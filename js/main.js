let $profileForm = document.querySelector('.profile-form');
let $profileName = document.querySelectorAll('.profile-name')
let $searchForm = document.querySelector('.search-form');
let $recipeSection = document.getElementById('recipe-section');
let $emptyMessage = document.getElementById('empty-message');
let $noDataMessage = document.getElementById('no-data');

 const updateName = () => {
  for (var t = 0; t < $profileName.length; t++) {
    $profileName[t].textContent = currentData.username;
   }
}

if (currentData.username !== undefined) {
  updateName();
  changeView('search');
}

$profileForm.addEventListener('submit', (event) =>{
  data.username = document.getElementById('user-name').value;
  if (data.username === '') {
    event.preventDefault();
    return;
  }
  for (let y = 0; y < $profileName.length; y++) {
  $profileName[y].textContent = document.getElementById('user-name').value;
  }
  let dataJSON = JSON.stringify(data);
  localStorage.setItem('project-local-storage', dataJSON);
  $profileForm.reset();
  currentData = JSON.parse(localStorage.getItem('project-local-storage'));
  updateName();
  changeView('search');
  event.preventDefault();
})

const changeView = (view) => {
  var $views = document.querySelectorAll('.display');

  if (view === 'favorites') {
    $recipeSection.innerHTML = '';
    $favoritesSection.innerHTML = '';
    $emptyMessage.innerHTML = '';

    for (let x = 0; x < currentData.favorites.length; x++) {
      $favoritesSection.appendChild(renderFavorites(currentData.favorites[x]));
    }
    if (currentData.favorites[0] === undefined) {
      let $message = document.createElement('h3');
      $message.textContent = 'Your Favorites Is Currently Empty';
      $emptyMessage.appendChild($message);
    }
  }

  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].className = 'display';
    }
    else {
      $views[i].className = 'hidden display';
    }
  }
}

$searchForm.addEventListener('submit', function(event) {
  let dish = document.getElementById('dish').value;
  let diet = document.getElementById('diet').value;
  let nutrition = document.getElementById('nutrition').value;
  $noDataMessage.innerHTML = '';

  if (diet !== "") {
    diet = '&health=' + document.getElementById('diet').value;
  }
  if (nutrition !== "") {
    nutrition = '&diet=' + document.getElementById('nutrition').value;
  }
  let xhr = new XMLHttpRequest();
  let _url = 'https://api.edamam.com/search?q=' + dish + '&app_id=4ec8f0b8&app_key=25713e68788fd4267505ef53ddc5081d' + diet + nutrition;

  xhr.open('GET', _url)
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    let recipeList = xhr.response;
    $recipeSection.innerHTML = '';
    for (let i = 0; i < recipeList.hits.length; i++) {
      $recipeSection.appendChild(renderRecipe(recipeList.hits[i]));
    }
    if ($recipeSection.innerHTML === '') {
      let $noData = document.createElement('h3');
      $noData.textContent = 'Sorry, There Is No Data For This Entry';
      $noDataMessage.appendChild($noData);
    }
  });
  xhr.send();
  $searchForm.reset();
  changeView('recipe-list');
  event.preventDefault();
})

const renderRecipe = (recipes) => {
let $row = document.createElement('div');
$row.className = 'row recipe-row';

let $columnOne = document.createElement('div');
$columnOne.className = 'column-half';

let $columnTwo = document.createElement('div');
$columnTwo.className = 'column-half recipe-info';

let $imageContainer = document.createElement('div');
$imageContainer.className = 'image-container';

let $image = document.createElement('img');
$image.className = 'recipe-image';
$image.setAttribute('src', recipes.recipe.image);

let $recipeName = document.createElement('h3');
$recipeName.className = 'recipe-title';
$recipeName.textContent = recipes.recipe.label;

let $div = document.createElement('div');
$div.className = 'align';

let $anchor = document.createElement('a');
$anchor.className = 'recipe-link';
$anchor.setAttribute('target', '_blank');
$anchor.setAttribute('href', recipes.recipe.url)

let $recipeButton = document.createElement('button');
$recipeButton.className = 'recipe-button';
$recipeButton.textContent = 'Go To Recipe!'

let $favoriteButton = document.createElement('button');
$favoriteButton.className = 'favorite-button';
$favoriteButton.textContent = 'Add To Favorites';

for (let f = 0; f < currentData.favorites.length; f++) {
  if (currentData.favorites[f].link === recipes.recipe.url) {
    $favoriteButton.textContent = 'Favorited';
   }
 }

$anchor.appendChild($recipeButton);
$div.appendChild($anchor);
$div.appendChild($favoriteButton);
$columnTwo.appendChild($recipeName);
$columnTwo.appendChild($div);
$imageContainer.appendChild($image);
$columnOne.appendChild($imageContainer);
$row.appendChild($columnOne);
$row.appendChild($columnTwo);

return $row;
}

const renderFavorites = (favoritesData) => {
  let $row = document.createElement('div');
  $row.className = 'row favorites-row';

  let $columnOne = document.createElement('div');
  $columnOne.className = 'column-half';

  let $columnTwo = document.createElement('div');
  $columnTwo.className = 'column-half recipe-info';

  let $imageContainer = document.createElement('div');
  $imageContainer.className = 'image-container';

  let $image = document.createElement('img');
  $image.className = 'recipe-image';
  $image.setAttribute('src', favoritesData.image);

  let $recipeName = document.createElement('h3');
  $recipeName.className = 'recipe-title';
  $recipeName.textContent = favoritesData.title;

  let $div = document.createElement('div');
  $div.className = 'align';

  let $anchor = document.createElement('a');
  $anchor.className = 'recipe-link';
  $anchor.setAttribute('target', '_blank');
  $anchor.setAttribute('href', favoritesData.link)

  let $recipeButton = document.createElement('button');
  $recipeButton.className = 'recipe-button';
  $recipeButton.textContent = 'Go To Recipe!'

  let $unfavoriteButton = document.createElement('button');
  $unfavoriteButton.className = 'unfavorite-button';
  $unfavoriteButton.textContent = 'Remove From Favorites';

  $anchor.appendChild($recipeButton);
  $div.appendChild($anchor);
  $div.appendChild($unfavoriteButton);
  $columnTwo.appendChild($recipeName);
  $columnTwo.appendChild($div);
  $imageContainer.appendChild($image);
  $columnOne.appendChild($imageContainer);
  $row.appendChild($columnOne);
  $row.appendChild($columnTwo);

  return $row;
}


let $favoritesSection = document.getElementById('favorites-section');

window.addEventListener('click', (event) => {

  if (event.target.tagName === "A" && event.target.getAttribute('href') === '#') {
    changeView(event.target.getAttribute('data-view'));
  }
  else {
    return;
  }
})

addEventListener('click', (event) => {
  if (event.target.className === 'favorite-button' && event.target.textContent !== 'Favorited') {
  let $recipeNames = document.querySelectorAll('.recipe-title');
  let $recipeImage = document.querySelectorAll('.recipe-image');
  let $recipeLink = document.querySelectorAll('.recipe-link');
  let $favButtons = document.querySelectorAll('.favorite-button');

  for (let i = 0; i < $favButtons.length; i++) {
    if ($favButtons[i] === event.target) {
      let favoritedRecipe = {};
      favoritedRecipe.title = $recipeNames[i].textContent;
      favoritedRecipe.image = $recipeImage[i].getAttribute('src');
      favoritedRecipe.link = $recipeLink[i].getAttribute('href');
      currentData.favorites.push(favoritedRecipe);
      let favoritesDataJSON = JSON.stringify(currentData);
      localStorage.setItem('project-local-storage', favoritesDataJSON);
      $favButtons[i].textContent = 'Favorited';
    }
  }
  }
})

addEventListener('click', (event) => {
  let $unfavoriteButtons = document.querySelectorAll('.unfavorite-button');
  let $favoritesRow = document.querySelectorAll('.favorites-row');

  if (event.target.className === 'unfavorite-button') {
    for (let i = 0; i < $unfavoriteButtons.length; i++) {
      if ($unfavoriteButtons[i] === event.target) {
        currentData.favorites.splice(i, 1);
        let newCurrentDataJSON = JSON.stringify(currentData);
        localStorage.setItem('project-local-storage', newCurrentDataJSON);
        changeView('favorites');
      }
    }
  }
})
