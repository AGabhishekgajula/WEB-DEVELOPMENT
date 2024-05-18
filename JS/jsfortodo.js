let btn=document.querySelector("button");
let mytask=document.querySelector("input");
let list=document.querySelector("ul");
console.dir(btn);
btn.addEventListener("click",function(){

    let myli= document.createElement("li");
    myli.textContent=mytask.value;
    list.appendChild(myli);
});