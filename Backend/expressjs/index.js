const express=require("express");
const app=express();

let port=3000;
app.listen(port,()=>{
    console.log("server is started ra ",port);
});

app.get("/search",(req,res)=>{
    console.log(req.query);
    res.send(req.query);
});
app.get("/",(req,res)=>{
    console.log("i am listeni");
    let mycode="<h1>todo list</h1><ul><li>eat biryani<li></ul>";
    res.send(mycode);
});