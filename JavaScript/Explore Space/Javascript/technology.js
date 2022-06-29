import fetchApi, { removeActive } from "./main.js";

let techTabs = document.querySelectorAll(".number");

let techName = document.getElementById("name");
let techSummary = document.getElementById("description");
let techImage = document.getElementById("tech-img");

// display data on destination page
let defaultTech = 0;

function getData(activeTech) {
  fetchApi().then((data) => {
    techName.textContent = data.technology[activeTech].name;
    techSummary.textContent = data.technology[activeTech].description;
    techImage.src = `.${data.technology[activeTech].images.portrait}`;
  });
}
getData(defaultTech);

function changeDataOnClick() {
  // add click event on links
  techTabs.forEach((num, index) => {
    num.addEventListener("click", (e) => {
      removeActive(techTabs);
      e.currentTarget.classList.add("active");
      //   display data on click
      getData(index);
    });
  });
}
changeDataOnClick();
