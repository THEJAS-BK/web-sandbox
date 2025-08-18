const allbtns = document.querySelectorAll(".btns");
const contentArea = document.querySelector(".content-digits");
const headContent = document.querySelector(".head-content");
let maxNumContent = 0; //for reset
let allNums = [];
let removeZero = false; //for Reset
let operator = "";
const sqrtSymbol = "\u221A";
const xSquare = "x\u00b2";

contentArea.classList.remove("contentSize");
allbtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    blinkbtn(btn);
    if (maxNumContent < 13) {
      if (btn.value == "squareRoot") {
        headContent.innerText += sqrtSymbol;
      } else {
        headContent.innerText += btn.innerText;
      }
    }
    contentArea.classList.remove("contentSize");
    if (
      (btn.innerText >= 0 && btn.innerText < 10 && maxNumContent < 13) ||
      btn.innerText == "."
    ) {
      for (let i = 0; i < 10; i++) {
        if (Number(btn.innerText) === i) {
          if (removeZero === false) {
            contentArea.innerText = "";
            removeZero = true;
          }
        }
      }
      contentArea.innerText += btn.innerText;
      maxNumContent++;
    } else if (btn.innerText == "CE" || btn.innerText == "C") {
      clearcontent();
    } else if (
      (btn.innerText == "+" ||
        btn.innerText == "-" ||
        btn.innerText == "x" ||
        btn.innerText == "\u00F7") &&
      allNums[0] !== ""
    ) {
      sortNums();
      operator = btn.innerText;
      checkRootOrDivide(operator);
    } else if (btn.innerText == "=" && allNums[0] !== NaN) {
      if (headContent.innerText[0] === sqrtSymbol) {
        let sqrtValue = headContent.innerText.slice(1, -1);
        sqrtValueFunc(sqrtValue);
      } else {
        sortNums();
        calculate(operator);
      }
    } else if (btn.innerText == "1/x") {
      divideByX();
    } else if (btn.innerText == xSquare) {
      xSquared();
    }
    if (btn.value == "YES") {
      removeLastDigit();
    } else if (btn.value == "plusminus") {
      contentArea.innerText = "-";
      headContent.innerText = "-";
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
//clicking animation
function blinkbtn(btn) {
  btn.classList.add("btn-opacity");
  setTimeout(() => {
    btn.classList.remove("btn-opacity");
  }, 200);
}
//clearing all the numbers
function clearcontent() {
  contentArea.innerText = "0";
  removeZero = false;
  allNums = [];
  headContent.innerText = "";
}

//removing one digit at a time
function removeLastDigit() {
  let display = document.querySelector(".content-digits");
  let headDisplay = document.querySelector(".head-content");
  if (display.innerText.length > 0) {
    display.innerText = display.innerText.slice(0, -1);
    headDisplay.innerText = headDisplay.innerText.slice(0, -1);
  } else {
    removeZero = false;
    contentArea.innerText = "0";
  }
}
function formatNumbers(n) {
  return n % 1 === 0 ? n.toFixed(0) : n.toString();
}

// performing all the calculations
function calculate(operation) {
  let zero = false;
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
  } else if (operation == "x") {
    ans = 1;
    for (let i = 0; i < allNums.length; i++) {
      ans *= allNums[i];
    }
  } else if (operation == "\u00F7") {
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
          zero = true;
        }
      }
    }
  }
  if (Number(ans) && zero == false) {
    allNums = [];
  }
  contentArea.innerText = `${formatNumbers(Number(ans.toFixed(13)))}`;
}

function contentHeadSection(num) {
  if (num == "/") {
    num = "\u00F7";
  }
  headContent.innerText += num;
}
function sqrtValueFunc(val) {
  squareValue = Math.sqrt(val);
  console.log(squareValue);
  contentArea.innerText = squareValue;
}
function divideByX() {
  let ans = 1 / Number(contentArea.innerText);
  headContent.innerText = `${sqrtSymbol} ( ${contentArea.innerText} ) =`;
  contentArea.innerText = ans;
}
function checkRootOrDivide(operator) {
  let symbols = ["+", "-", "\u00F7", "x"];
  if (symbols.includes(operator)) {
    headContent.innerText = `${allNums[0]}${operator}`;
  }
}
function xSquared() {
  headContent.innerText = headContent.innerText.slice(0, -2);
  let val = Number(contentArea.innerText);
  val = val * val;
  headContent.innerText = `( ${contentArea.innerText} )\u00b2=`;
  contentArea.innerText = val;
}
//?standard to scientific and wise versa
let sideBar = document.querySelector(".fa-bars");
sideBar.addEventListener("click", () => {});
