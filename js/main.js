const locationSearch = document.getElementById('location-search');
const searchForm = document.getElementById('brewery-search');
const tbody = document.getElementById('search-results');
const table = document.getElementById('search-table');
const mustSeeButton = document.getElementById('must-see-button');
let breweries;

function searchFormatFix(string) {
  return string.replaceAll(' ', '_');
}

function newSearch(breweries) {
  table.classList.remove('hidden');
  mustSeeButton.classList.replace('hidden', 'btn');
  for (let i = 0; i < breweries.length; i++) {
    if (breweries[i].name && breweries[i].street) {
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
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  breweries = [];
  const searchValue = searchFormatFix(locationSearch.value);
  locationSearch.value = '';
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchValue}&per_page=10`)
    .then(res => res.json())
    .then(res => {
      breweries = res;
      newSearch(breweries);
    });
});
