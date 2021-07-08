/* exported getData */
/* exported mustSeeData */
/* exported getFavorite */
/* exported favorite */
let mustSeeData = [];
let favorite;

const dataJSON = localStorage.getItem('must-see');
const dataJSONTwo = localStorage.getItem('favorite');

if (dataJSON) {
  mustSeeData = JSON.parse(dataJSON);
}

if (dataJSONTwo) {
  favorite = JSON.parse(dataJSONTwo);
}

window.addEventListener('beforeunload', function (event) {
  const stateJSON = JSON.stringify(mustSeeData);
  const stateJSONTwo = JSON.stringify(favorite);
  localStorage.setItem('must-see', stateJSON, 'favorite', stateJSONTwo);
});

function getData(data) {
  if (data) {
    for (let i = 0; i < data.length; i++) {
      mustSeeData.push(data[i]);
    }
  }
  const stateJSON = JSON.stringify(mustSeeData);
  localStorage.setItem('must-see', stateJSON);
}

function getFavorite() {
  const data = localStorage.getItem('favorite');
  if (data) {
    favorite = JSON.parse(data);
  }
}
