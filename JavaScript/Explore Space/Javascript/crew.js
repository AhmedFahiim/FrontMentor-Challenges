import fetchApi, { removeActive } from "./main.js";

let bullets = document.querySelectorAll(".bullet");

let position = document.getElementById("position");
let name = document.getElementById("name");
let brief = document.getElementById("brief");
let memberImg = document.getElementById("member-img");

// get data and display the default
let defaultMember = 0;

function getData(activeMember) {
  fetchApi().then((data) => {
    position.textContent = data.crew[activeMember].role;
    name.textContent = data.crew[activeMember].name;
    brief.textContent = data.crew[activeMember].bio;
    memberImg.src = `.${data.crew[activeMember].images.png}`;
  });
}

getData(defaultMember);

// change data on click

function changeData() {
  bullets.forEach((li, index) => {
    li.addEventListener("click", (e) => {
      removeActive(bullets);
      e.currentTarget.classList.add("active");
      // change the data
      getData(index);
    });
  });
}
changeData();
