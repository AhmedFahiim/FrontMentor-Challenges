let nested = document.querySelectorAll(".nested");
let lis = document.querySelectorAll(".main > li");

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    nested.forEach((ul) => {
      if (nested[e.currentTarget.dataset.index] !== ul) {
        ul.classList.remove("open");
      }
    });
    nested[e.currentTarget.dataset.index].classList.toggle("open");
  });
});
