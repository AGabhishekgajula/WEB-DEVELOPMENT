let gameSeq=[];
let userSeq=[];
let colors=["red","yellow","green","purple"];
let btns=document.querySelectorAll(".btn");
console.log(btns);
let started=false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false)
        {
            console.log("keypressed");
            started=true;
            levelUP();
            console.log("keypressed");
        }
});

function levelUP(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`
    let color=Math.floor(Math.random()*4);
    gameSeq.push(colors[color]);
    
    btnFlash(btns[color]);
}
function btnFlash(btn){
     btn.classList.add("flash");
     setTimeout(function(){
        btn.classList.remove("flash");
     },250);
}
function btnPressed(){
    let btn=this;
    btnFlash(btn);
    let color= btn.getAttribute("id");
    userSeq.push(color);
    correction(userSeq.length-1);
}
for(btn of btns) {
     btn.addEventListener("click",btnPressed);
 }
 function correction(index){
    console.log("curr level:",level);
   
    if(userSeq[index]==gameSeq[index])
        {
           if(userSeq.length==gameSeq.length){
            setTimeout(levelUP,1000);
           }
        }
    else{
       h2.innerText="Game over: sigguleda";
       
    }
 }
function checkequal()
{
    for(let i=0;i<userSeq.length;i++)
        {
            if(userSeq[i]!=gameSeq[i])
                {
                    return false;
                }
        
        }
        return true;
}
function reset()
{
    started=false;
    gameSeq=[];
}