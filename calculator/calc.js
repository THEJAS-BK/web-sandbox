const allbtns = document.querySelectorAll(".btns");
const contentArea = document.querySelector(".content-digits");
let maxNumContent = 0; //for reset
let allNums = [];
let removeZero = false; //for Reset
let operatorLock = false;
let operation = "";
allbtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let operation = "";
    if (btn.innerText >= 0 && btn.innerText < 10 && maxNumContent < 13) {
      if (removeZero === false) {
        contentArea.innerText = "";
        removeZero = true;
      }
      contentArea.innerText += btn.innerText;
      maxNumContent++;
    } else if (btn.innerText == "CE" || btn.innerText == "C") {
      clearcontent();
    }
  });
});
function sortNums() {
  let trimming = Number(contentArea.innerText);
  allNums.push(trimming);
  contentArea.innerText = 0;
  removeZero = false;
  maxNumContent = 0;
}
function clearcontent() {
  contentArea.innerText = "0";
  removeZero = false;
  allNums = [];
}
function removeLastDigit() {
  let display = document.querySelector(".content-digits");
  display.innerText = display.innerText.slice(0, -1);
}
function calculate(operation) {
  sum = 0;
  if (operation == "+") {
    for (i = 0; i < allNums.length; i++) {
      sum = allNums[i];

      console.log(sum);
    }
    operatorLock = false;
  }
}
