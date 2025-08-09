const allbtns = document.querySelectorAll(".btns");
const contentArea = document.querySelector(".content-digits");
let maxNumContent = 0; //for reset
let allNums = [];
let removeZero = false; //for Reset
let operator = "";
contentArea.classList.remove("contentSize");
allbtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    contentArea.classList.remove("contentSize");
    if (
      (btn.innerText >= 0 && btn.innerText < 10 && maxNumContent < 13) ||
      btn.innerText == "."
    ) {
      if (removeZero === false) {
        contentArea.innerText = "";
        removeZero = true;
      }
      contentArea.innerText += btn.innerText;
      maxNumContent++;
    } else if (btn.innerText == "CE" || btn.innerText == "C") {
      clearcontent();
    } else if (
      btn.innerText == "+" ||
      btn.innerText == "-" ||
      btn.innerText == "*" ||
      btn.innerText == "/"
    ) {
      sortNums();
      operator = btn.innerText;
    } else if (btn.innerText == "=") {
      sortNums();
      calculate(operator);
    } else if (btn.innerText == "$") {
      removeLastDigit();
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
  let ans = 0;
  if (operation == "+") {
    for (let i = 0; i < allNums.length; i++) {
      ans += allNums[i];
    }
  } else if (operation == "-") {
    ans = allNums[0];
    for (let i = 1; i < allNums.length; i++) {
      ans -= allNums[i];
    }
  } else if (operation == "*") {
    ans = 1;
    for (let i = 0; i < allNums.length; i++) {
      ans *= allNums[i];
    }
  } else if (operation == "/") {
    ans = allNums[0];
    if (allNums[0] == 0) {
      ans = 0;
    } else {
      for (let i = 1; i < allNums.length; i++) {
        if (allNums[i] !== 0) {
          ans /= allNums[i];
        } else {
          ans = " YOU CAN'T DIVIDE ANYTHING BY ZERO YOU IDIOT";
          contentArea.classList.add("contentSize");
        }
      }
    }
  }
  allNums = [];
  if (Number(ans)) {
    allNums.push(ans);
  }
  contentArea.innerText = `${ans}`;
}
