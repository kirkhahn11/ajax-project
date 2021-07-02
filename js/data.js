/* exported getData */
/* exported mustSeeData */
let mustSeeData = [];

var dataJSON = localStorage.getItem('must-see');

if (dataJSON !== 'undefined') {
  mustSeeData = JSON.parse(dataJSON);
}

window.addEventListener('beforeunload', function (event) {
  const stateJSON = JSON.stringify(mustSeeData);
  localStorage.setItem('must-see', stateJSON);
});

function getData(data) {
  for (let i = 0; i < data.length; i++) {
    mustSeeData.push(data[i]);
  }
  const stateJSON = JSON.stringify(mustSeeData);
  localStorage.setItem('must-see', stateJSON);
}
