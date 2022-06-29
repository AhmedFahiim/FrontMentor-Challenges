import fetchApi, { removeActive } from "./main.js";

let planetTabs = document.querySelectorAll(".link-item-planet");

let planetImage = document.getElementById("planet-image");
let planetName = document.getElementById("planet-name");
let planetSummary = document.getElementById("planet-summary");
let distanceNumber = document.getElementById("distance-num");
let timeNumber = document.getElementById("time-num");

// display data on destination page
let defaultPlanet = 0;

function destinationData(activePlanet) {
  fetchApi().then((data) => {
    planetImage.src = `.${data.destinations[activePlanet].images.png}`;
    planetName.textContent = data.destinations[activePlanet].name;
    planetSummary.textContent = data.destinations[activePlanet].description;
    distanceNumber.textContent = data.destinations[activePlanet].distance;
    timeNumber.textContent = data.destinations[activePlanet].travel;
  });
}
destinationData(defaultPlanet);

function displayDataOnClick() {
  // add click event on links
  planetTabs.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      removeActive(planetTabs);
      e.currentTarget.classList.add("active");
      //   display data on click
      destinationData(index);
    });
  });
}
displayDataOnClick();
