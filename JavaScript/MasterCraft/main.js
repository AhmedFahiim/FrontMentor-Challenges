let progress = document.querySelector(".perc");
let totalNum = document.querySelector(".totalnum");
let backedNum = document.querySelector(".num");
let layProject = document.querySelectorAll(".lay-projects .project");
let checked = document.querySelectorAll(".selected");
let hide = document.getElementById("close");
let overLay = document.querySelector(".overlay");
let reward = document.querySelector(".reward");

console.log(overLay);
// calculate the width of progress
progress.style.width = `${
  (parseInt(backedNum.textContent) / parseInt(totalNum.textContent)) * 100
}%`;

// add event listner on radio input
checked.forEach((input) => {
  input.addEventListener("click", (e) => {
    layProject.forEach((p) => {
      p.classList.remove("active");
      layProject[parseInt(e.currentTarget.dataset.index)].classList.add(
        "active"
      );
    });
  });
});

// hide the over lay
hide.onclick = () => {
  overLay.style.display = "none";
};
// display the over lay
reward.onclick = function () {
  overLay.style.display = "block";
};
