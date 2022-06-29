let price = document.querySelector(".price"),
  progress = document.querySelector(".progress-bar"),
  rangeIn = document.getElementById("range");

// handling the range bar
function printPrice() {
  price.textContent = `$${parseFloat(rangeIn.value).toFixed(2)}`;
}
function changeProgress() {
  printPrice();
  progress.style.right = `${100 - (rangeIn.value / rangeIn.max) * 100}%`;
}
changeProgress();

rangeIn.oninput = changeProgress;

// swap between two plans
let swap = document.querySelector(".swap-holder");

swap.onclick = function () {
  swap.classList.toggle("swapped");
};
