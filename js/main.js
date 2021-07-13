/* global getData */
/* global mustSeeData */
/* global getFavorite */
/* global favorite */
const locationSearch = document.getElementById('location-search');
const searchForm = document.getElementById('brewery-search');
const tbody = document.getElementById('search-results');
const table = document.getElementById('search-table');
const next = document.getElementById('next');
const deleteModal = document.getElementById('delete-modal');
const deleteModalClose = document.getElementById('delete-modal-close');
const deleteModalConfirm = document.getElementById('delete-modal-confirm');
const deleteModalTitle = document.getElementById('delete-modal-title');
const favoriteModal = document.getElementById('favorite-modal');
const favoriteModalClose = document.getElementById('favorite-modal-close');
const favoriteModalConfirm = document.getElementById('favorite-modal-confirm');
const favoriteModalTitle = document.getElementById('favorite-modal-title');
const favoriteCaption = document.getElementById('favorite-caption');
const favoriteHeading = document.getElementById('favorite-heading');
const favoriteBeer = document.getElementById('favorite-beer');
const favoriteBodyContainer = document.getElementById('favorite-body-container');
const editModal = document.getElementById('edit-modal');
const editModalClose = document.getElementById('edit-modal-close');
const editModalConfirm = document.getElementById('edit-modal-confirm');
const editModalTitle = document.getElementById('edit-modal-title');
const editCaptionValue = document.getElementById('edit-caption');
const heading = document.getElementById('heading2');
const previous = document.getElementById('previous');
const bodyContainer = document.getElementById('body-container');
const mustSeeButton = document.getElementById('must-see-button');
let city;
let count = 1;
let breweries;
let mustSeeList = [];

deleteModalClose.addEventListener('click', () => {
  deleteModal.classList.replace('brewery-modal', 'hidden');
});

deleteModalConfirm.addEventListener('click', deleteMustSee);

favoriteModalClose.addEventListener('click', () => {
  favoriteModal.classList.replace('brewery-modal', 'hidden');
});

favoriteModalConfirm.addEventListener('click', addFavorite);

editModalClose.addEventListener('click', () => {
  editModal.classList.replace('brewery-modal', 'hidden');
});

editModalConfirm.addEventListener('click', editCaption);

function searchFormatFix(string) {
  return string.replaceAll(' ', '_');
}

function addMustSee(brewery) {
  for (let i = 0; i < mustSeeList.length; i++) {
    if (mustSeeList[i].id === brewery.id) {
      mustSeeList.splice(i, 1);
      return;
    }
  }
  mustSeeList.push(brewery);
}

function newSearch(breweries) {
  table.classList.remove('hidden');
  next.classList.remove('hidden');
  if (breweries.length === 10) {
    next.classList.add('btn');
  }
  if (breweries.length < 10) {
    next.classList.replace('btn', 'hidden');
  }
  if (count === 1) {
    previous.classList.replace('btn', 'hidden');
  }
  while (tbody.lastChild) {
    tbody.removeChild(tbody.lastChild);
  }
  mustSeeButton.classList.replace('hidden', 'btn');
  for (let i = 0; i < breweries.length; i++) {
    const tr = document.createElement('tr');
    const tdInput = document.createElement('td');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.classList.add('mt-2');
    input.addEventListener('change', function () {
      addMustSee(breweries[i]);
    });
    tdInput.append(input);
    const tdName = document.createElement('td');
    tdName.textContent = breweries[i].name;
    const tdAddress = document.createElement('td');
    tdAddress.textContent = breweries[i].street;
    tr.append(tdInput, tdName, tdAddress);
    tbody.append(tr);
  }
}

function editModalAppear() {
  editModal.classList.replace('hidden', 'brewery-modal');
  editModalTitle.textContent = 'Update Caption For ' + favorite.name + '?';
}

function deleteModalAppear(event) {
  deleteModal.classList.replace('hidden', 'brewery-modal');
  deleteModalConfirm.setAttribute('value', event.target.value);
  for (let i = 0; i < mustSeeData.length; i++) {
    if (mustSeeData[i].id.toString() === event.target.value.toString()) {
      deleteModalTitle.textContent = 'Delete ' + mustSeeData[i].name + ' From Must-See?';
    }
  }
}

function favoriteModalAppear(event) {
  favoriteModal.classList.replace('hidden', 'brewery-modal');
  favoriteModalConfirm.setAttribute('value', event.target.value);
  if (favorite) {
    for (let i = 0; i < mustSeeData.length; i++) {
      if (mustSeeData[i].id.toString() === event.target.value.toString()) {
        favoriteModalTitle.textContent = 'Replace ' + favorite.name + ' with ' + mustSeeData[i].name + '?';
      }
    }
  } else {
    for (let i = 0; i < mustSeeData.length; i++) {
      if (mustSeeData[i].id.toString() === event.target.value.toString()) {
        favoriteModalTitle.textContent = 'Make ' + mustSeeData[i].name + ' Your Favorite?';
      }
    }
  }
}

function deleteMustSee(event) {
  let emptyData;
  for (let i = 0; i < mustSeeData.length; i++) {
    if (mustSeeData[i].id.toString() === event.target.value.toString()) {
      mustSeeData.splice(i, 1);
    }
  }
  deleteModal.classList.replace('brewery-modal', 'hidden');
  renderMustSee();
  getData(emptyData);
}

function addFavorite(event) {
  let newFavorite;
  for (let i = 0; i < mustSeeData.length; i++) {
    if (mustSeeData[i].id.toString() === event.target.value.toString()) {
      newFavorite = mustSeeData[i];
    }
  }
  newFavorite.caption = favoriteCaption.value;
  newFavorite.beer = favoriteBeer.value;
  favoriteModal.classList.replace('brewery-modal', 'hidden');
  localStorage.setItem('favorite', JSON.stringify(newFavorite));
  getFavorite();
  favoriteCaption.value = '';
  favoriteBeer.value = '';
  renderFavorite();
}

function editCaption(event) {
  const newFavorite = favorite;
  newFavorite.caption = editCaptionValue.value;
  editModal.classList.replace('brewery-modal', 'hidden');
  localStorage.setItem('favorite', JSON.stringify(newFavorite));
  getFavorite();
  editCaptionValue.value = '';
  renderFavorite();
}

function renderFavorite() {
  if (!favorite) {
    favoriteHeading.textContent = 'Select A Favorite!!!';
  } else {
    while (favoriteBodyContainer.lastChild) {
      favoriteBodyContainer.removeChild(favoriteBodyContainer.lastChild);
    }
    const div = document.createElement('div');
    div.classList.add('col-12', 'favorite-background', 'text-center');
    const name = document.createElement('h1');
    name.classList.add('favorite-heading', 'heading', 'page-font', 'text-center', 'text-warning');
    name.textContent = favorite.name;
    const divTwo = document.createElement('div');
    divTwo.classList.add('bg-light', 'm-auto', 'w-75');
    const address = document.createElement('h1');
    address.classList.add('heading', 'page-font', 'text-center', 'text-dark');
    address.textContent = 'Address: ' + favorite.street + ' ' + favorite.city + ', ' + favorite.state;
    const bestBeer = document.createElement('h1');
    bestBeer.classList.add('heading', 'page-font', 'text-center', 'text-dark');
    bestBeer.textContent = 'Best Beer: ' + favorite.beer;
    divTwo.append(address, bestBeer);
    const captionHeading = document.createElement('h1');
    captionHeading.classList.add('favorite-heading', 'heading', 'page-font', 'text-center', 'text-warning');
    captionHeading.textContent = 'Your Comments: ';
    const divThree = document.createElement('div');
    divThree.classList.add('bg-light', 'm-auto', 'w-75');
    const caption = document.createElement('h2');
    caption.classList.add('heading', 'page-font', 'text-center', 'text-dark');
    caption.textContent = favorite.caption;
    divThree.append(caption);
    const button = document.createElement('button');
    button.classList.add('page-font', 'mt-1', 'mb-1', 'w-20', 'm-auto', 'btn-warning', 'btn-lg');
    button.textContent = 'Edit Caption';
    button.addEventListener('click', editModalAppear);
    div.append(name, divTwo, captionHeading, divThree, button);
    favoriteBodyContainer.append(div);
  }
}

function renderMustSee() {
  if (mustSeeData.length === 0) {
    heading.textContent = 'No Breweries Selected';
    while (bodyContainer.lastChild) {
      bodyContainer.removeChild(bodyContainer.lastChild);
    }
  } else {
    heading.textContent = 'Must-See';
    while (bodyContainer.lastChild) {
      bodyContainer.removeChild(bodyContainer.lastChild);
    }
    for (let i = 0; i < mustSeeData.length; i++) {
      const row = document.createElement('div');
      row.classList.add('row', 'text-center', 'justify-content-center', 'fb-50');
      const div = document.createElement('div');
      div.classList.add('brewery-background', 'rounded', 'shadow', 'mt-3', 'h-200');
      div.setAttribute('style', 'width: 90%');
      row.append(div);
      const hTwo = document.createElement('h4');
      hTwo.classList.add('page-font', 'text-white', 'lh-lg');
      hTwo.textContent = mustSeeData[i].name;
      const hSix = document.createElement('h6');
      hSix.classList.add('page-font', 'text-white', 'lh-lg');
      hSix.textContent = mustSeeData[i].street + ' ' + mustSeeData[i].city + ', ' + mustSeeData[i].state;
      const divTwo = document.createElement('div');
      divTwo.classList.add('d-flex', 'justify-content-around', 'w-100');
      div.append(hTwo, hSix, divTwo);
      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('value', mustSeeData[i].id);
      deleteButton.setAttribute('type', 'submit');
      deleteButton.classList.add('page-font', 'mt-1', 'btn-dark', 'text-white', 'btn-lg');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteModalAppear(event);
      });
      const favoriteButton = document.createElement('button');
      favoriteButton.setAttribute('value', mustSeeData[i].id);
      favoriteButton.setAttribute('type', 'submit');
      favoriteButton.classList.add('page-font', 'mt-1', 'btn-warning', 'btn-lg');
      favoriteButton.textContent = 'Make Favorite';
      favoriteButton.addEventListener('click', favoriteModalAppear);
      divTwo.append(deleteButton, favoriteButton);
      bodyContainer.append(row);
    }
  }
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  breweries = [];
  previous.classList.replace('hidden', 'btn');
  city = locationSearch.value;
  const searchValue = searchFormatFix(city);
  locationSearch.value = '';
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchValue}&per_page=10`)
    .then(res => res.json())
    .then(res => {
      breweries = res;
      newSearch(breweries);
    });
});

next.addEventListener('click', () => {
  mustSeeList = [];
  breweries = [];
  count++;
  previous.classList.replace('hidden', 'btn');
  const searchValue = searchFormatFix(city);
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchValue}&per_page=10&page=${count}`)
    .then(res => res.json())
    .then(res => {
      breweries = res;
      newSearch(breweries);
    });
});

previous.addEventListener('click', () => {
  mustSeeList = [];
  breweries = [];
  count--;
  const searchValue = searchFormatFix(city);
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchValue}&per_page=10&page=${count}`)
    .then(res => res.json())
    .then(res => {
      breweries = res;
      newSearch(breweries);
    });
});

mustSeeButton.addEventListener('click', () => {
  let sentence = '';
  getData(mustSeeList);
  if (mustSeeList.length === 0) {
    return window.alert('No Breweries Selected');
  } else {
    localStorage.setItem('must-see', JSON.stringify(mustSeeList));
    for (let i = 0; i < mustSeeList.length; i++) {
      sentence += mustSeeList[i].name + ' ';
    }
    window.alert(sentence + 'Successfully added to Must-See');
    mustSeeList = [];
    const searchValue = searchFormatFix(city);
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchValue}&per_page=10&page=${count}`)
      .then(res => res.json())
      .then(res => {
        breweries = res;
        newSearch(breweries);
        renderMustSee();
      });
  }
});

renderMustSee();
renderFavorite();
