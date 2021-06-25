// fetch('https://api.openbrewerydb.org/breweries?per_page=50')
//   .then(res => res.json())
//   .then(res => console.log(res));

const locationSelect = document.getElementById('location-select');
const locationSearch = document.getElementById('location-search');
const searchForm = document.getElementById('brewery-search');
let breweries = [];

function searchFormatFix(string) {
  return string.replaceAll(' ', '_');
}

locationSelect.addEventListener('change', () => {
  if (locationSelect.value === 'Search By City Or State') {
    locationSearch.disabled = true;
  } else locationSearch.disabled = false;
});

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  breweries = [];
  const searchValue = searchFormatFix(locationSearch.value);
  fetch(`https://api.openbrewerydb.org/breweries?per_page=50?${locationSelect.value}=${searchValue}`)
    .then(res => res.json())
    .then(res => {
      breweries.push(res);

    });
});
