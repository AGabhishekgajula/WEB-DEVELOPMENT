const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');

// setting views
app.set("view engine","views");
app.set("views",path.join(__dirname,"views"));

//setting static files
app.use(express.static(path.join(__dirname,'public')));

//handling post request
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//to override post method to patch method
app.use(methodOverride('_method'));


let posts=[
    {
        id:uuidv4(),
        username:"abhishek",
        content:"hardwork is key to success",
    },
    {   
        id:uuidv4(),
        username:"vicky",
        content:"i am a good boy",
    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("search.ejs",{post});
});
app.post("/posts",(req,res)=>{
   let {username,content}=req.body;
   let id=uuidv4();
   posts.push({id,username,content});
   res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post}); 
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
   let newcontent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newcontent;
    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log("i am listening");
});
