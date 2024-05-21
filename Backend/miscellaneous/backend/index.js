const express=require("express");
const app=express();
const port=8080;
const path=require("path");

//to parse the post data
app.use(express.urlencoded({extended:true}));
app.use(express.json());//it is use to understand json file
app.set("view engine","ejs");//telling to express that template engine is renered by ejs

app.get("/register",(req,res)=>{
    res.send("standard get request");
});
app.post("/register",(req,res)=>{
    let {username,password}= req.body;// it will not understand if we not parse the data
    res.send("standard post request");
})
app.listen(port,()=>{
    console.log("i am listening");
});