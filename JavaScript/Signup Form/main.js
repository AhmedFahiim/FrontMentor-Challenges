let button = document.querySelector("[type='submit']");
let textIn = document.querySelectorAll("[type='text']");
let passwordIn = document.querySelector("[type='password']");
let mailIn = document.querySelector("[type='email']");

textIn.forEach((i) => {
  let textReg = /\s/gi;
  i.oninput = function () {
    if (i.value.match(textReg) || i.value == "") {
      i.nextElementSibling.style.visibility = "visible";
    } else {
      i.nextElementSibling.style.visibility = "hidden";
    }
  };
});
