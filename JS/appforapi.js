let url="http://universities.hipolabs.com/search?name=";
let btn=document.querySelector("button");
let ul=document.querySelector("ul");


btn.addEventListener("click",async ()=>{
    let country=document.querySelector("input").value;
    let colleges= await getColleges(country);
    addelments(colleges);

  
});
function addelments(colleges){
    for(item of colleges){
       let li= document.createElement("li");
        li.textContent=item.name;
        ul.append(li);  
    }
    
        
        
}
async function  getColleges(country)
{
    try{
         let res = await axios.get(url+country);
         console.log(res);
        return res.data;
    }
    catch(e){
        console.log("error :",e);
    }
}