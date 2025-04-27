let inp = document.querySelector(".inp1");
let addbtn = document.querySelector(".add");
let content = document.querySelector(".content");

addbtn.addEventListener("click", () => {
  let inpval = inp.value;
  addline(inpval);
  inp.value = "";
  inp.setAttribute("placeholder", "Add New");
});
function addline(inpval) {
  let line = document.createElement("div");
  let box1 = document.createElement("div");
  box1.innerText = inpval;
  content.append(line);
  line.classList.add("line");
  line.appendChild(box1);

  let box2 = document.createElement("div");
  line.appendChild(box2);
  let xmark = document.createElement("button");
  box2.append(xmark);
  xmark.classList.add("del");
  let icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-xmark");
  xmark.append(icon);

  let allbtns = document.querySelectorAll(".del");
  delsug(allbtns);
}
function delsug(allbtns) {
  allbtns.forEach((bt) => {
    bt.addEventListener("click", () => {
      bt.parentElement.parentElement.remove();
    });
  });
}
