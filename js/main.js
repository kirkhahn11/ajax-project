const locationSearch = document.getElementById('location-search');
const searchForm = document.getElementById('brewery-search');
const tbody = document.getElementById('search-results');
const table = document.getElementById('search-table');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const mustSeeButton = document.getElementById('must-see-button');
let city;
let count = 1;
let breweries;

function searchFormatFix(string) {
  return string.replaceAll(' ', '_');
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
    tdInput.append(input);
    const tdName = document.createElement('td');
    tdName.textContent = breweries[i].name;
    const tdAddress = document.createElement('td');
    tdAddress.textContent = breweries[i].street;
    tr.append(tdInput, tdName, tdAddress);
    tbody.append(tr);
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
