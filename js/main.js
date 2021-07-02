/* global getData */
/* global mustSeeData */
const locationSearch = document.getElementById('location-search');
const searchForm = document.getElementById('brewery-search');
const tbody = document.getElementById('search-results');
const table = document.getElementById('search-table');
const next = document.getElementById('next');
const heading = document.getElementById('heading2');
const previous = document.getElementById('previous');
const bodyContainer = document.getElementById('body-container');
const mustSeeButton = document.getElementById('must-see-button');
let city;
let count = 1;
let breweries;
let mustSeeList = [];

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

function renderMustSee() {
  if (!mustSeeData) {
    heading.textContent = 'No Breweries Selected';
  } else {
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
      deleteButton.setAttribute('type', 'submit');
      deleteButton.classList.add('page-font', 'mt-1', 'btn-dark', 'text-white', 'btn-lg');
      deleteButton.textContent = 'Delete';
      const favoriteButton = document.createElement('button');
      favoriteButton.setAttribute('type', 'submit');
      favoriteButton.classList.add('page-font', 'mt-1', 'btn-warning', 'btn-lg');
      favoriteButton.textContent = 'Make Favorite';
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
