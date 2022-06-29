let input = document.getElementById("mail");
let button = document.querySelector("button");
let error = document.querySelector(".error");
console.log(input);

button.onclick = function () {
  let inputRe = /\w+@(gmail|yahoo|hotmail).(com|org)/gi;
  if (inputRe.test(input.value)) {
    return true;
  } else {
    error.style.display = "block";
    return false;
  }
};
