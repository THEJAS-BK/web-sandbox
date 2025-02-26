boxs=document.querySelectorAll(".box");
reset=document.querySelectorAll(".new");
resetpage=document.querySelector(".winner");
para=document.querySelector("p");
turn0=true;
const winpat=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
/*functions*/
const disablebox=()=>{
    boxs.forEach((box0)=>{
        box0.disabled=true;
    })
}
const resetgame=()=>{
    reset.forEach((vals)=>{ 
        vals.addEventListener("click",()=>{
          turn0=true;
          boxs.forEach((box)=>{
            box.innerText="";
            box.disabled=false;
            resetpage.classList.add("invisible")
          })
    })
   
    })
}



/*X AND ) */
boxs.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0===true){
        box.innerText="X";
        turn0=false;
    }
        else{
            turn0=true;
            box.innerText="O";
        }
        box.disabled=true;
        check();
        resetgame();
    })
  
})

/*winners*/
function check(){
    for(let pat of winpat){
        pos1=boxs[pat[0]].innerText;
        pos2=boxs[pat[1]].innerText;
        pos3=boxs[pat[2]].innerText;

        if(pos1!==" "&& pos2!=="" && pos3!==""){
            if(pos1===pos2 && pos2===pos3){
                para.innerText=`${pos1} PLAYER WON`
                resetpage.classList.remove("invisible")
                disablebox();
            }
        }
    }
}