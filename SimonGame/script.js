let level = 0;
let start = false;
let h3 = document.querySelector("h3");
let btns = ["box1", "box2", "box3", "box4"];
let userseq = [];
let gameseq = [];

document.addEventListener("keydown", function () {
  if (start == false) {
    start = true;

    levelup();
  }
});

function levelup() {
  level++;
  userseq = [];
  h3.innerText = `Level ${level}`;
  let randidx = Math.floor(Math.random() * 4);
  let randcolor = btns[randidx];
  let randbtn = document.querySelector(`.${randcolor}`);
  blinkbtn(randbtn);
  gameseq.push(randcolor);
  console.log(gameseq);
}

function blinkbtn(btn) {
  btn.classList.add("flashwhite");
  setTimeout(function () {
    btn.classList.remove("flashwhite");
  }, 500);
}
function blinkgreen(btn) {
  btn.classList.add("flashgreen");
  setTimeout(function () {
    btn.classList.remove("flashgreen");
  }, 500);
}

let allbtns = document.querySelectorAll(".box");
for (bt of allbtns) {
  bt.addEventListener("click", blinkbtnuser);
}

function blinkbtnuser() {
  let btn = this;
  blinkgreen(btn);
  let sbtn = btn.getAttribute("id");
  userseq.push(sbtn);
  checkans(userseq.length - 1);
}

function checkans(idx) {
  if (gameseq[idx] === userseq[idx]) {
    if (gameseq.length === userseq.length) {
      setTimeout(() => {
        levelup();
      }, 1000);
    }
  } else {
    h3.innerText = "Game over !!! press any key to start again";
    gameseq = [];
    userseq = [];
    start = false;
    level = 0;
    let body = document.querySelector("body");
    body.classList.add("flashred");
    setTimeout(() => {
      body.classList.remove("flashred");
    }, 250);
  }
}
