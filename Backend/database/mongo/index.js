const mongoose = require('mongoose');
const express = require("express");
const app=express();
const path=require("path");
const Chat=require("./models/chats.js");


main().then(()=>{
    console.log("connections successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

//showing routes
app.get("/chats", async (req,res)=>{

      let chats=await Chat.find();
      res.render("index.ejs",{chats});
});
//new chat
app.get("/chats/new",(req,res)=>{
     res.render("new.ejs");
});
app.post("/chats",(req,res)=>{
      let {from,to,msg}=req.body;
      let newchat=new Chat({
        from:`${from}`,
        to:`${to}`,
        msg:`${msg}`,
        created_at:new Date(),
      });
      newchat.save()
      .then((result)=>{
        res.redirect("/chats");
      })
      .catch((err)=>{
        res.send(err);
      });
      

});

app.get("/",(req,res)=>{
    console.log("i am groot");
});
app.listen("8080",()=>{
     console.log("vintunnare babu");
});
// const userSchema=mongoose.Schema({
//     name:String,
//     email:String,
//     age:Number
// });
// const User=mongoose.model("User",userSchema);
// let user1=new User({
//     name:"adam",
//     email:"abc@gmail.com",
//     age:48,
// });
// user1.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })