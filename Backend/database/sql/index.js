const express=require("express");
const app=express();
const { faker, tr } = require('@faker-js/faker');
const mysql=require("mysql2");
const path=require("path");
var methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//setting the view engine
app.set("view engine","views");
app.set("views",path.join(__dirname,"/views"));



// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydbforw',
    password:'mission50'
});


let getRandomUser= ()=>{
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password()
  ];
};



app.get("/",(req,res)=>{
     let q='select count(*) from user;';
     try{
            connection.query(q,(err,result)=>{
                 if(err) throw err;
                 let count=result[0]["count(*)"];
                 res.render("home.ejs",{count});
            }
                 );
                }
      catch(err){
         console.log(err);
      }
      // connection.end();

});
app.get("/users",(req,res)=>{
  let q='select * from user;';
  try{
         connection.query(q,(err,users)=>{
              if(err) throw err;
              console.log(users);
               res.render("users.ejs",{users});
            });
    }
   catch(err){
      console.log(err);
      res.send("oops! sorry unable to fetch the details");
   }
   // connection.end();

});
app.get("/user/:id/edit",(req,res)=>{
      let {id}=req.params;
      let q=`select * from user where id='${id}'`;
      try{
        connection.query(q,(err,user)=>{
             if(err) throw err;
              let result=user[0];
              res.render("edit.ejs",{result});
           });
   }
  catch(err){
     console.log(err);
     res.send("oops! sorry unable to fetch the details");
  }
  // connection.end();

       
});

app.patch("/user/:id",(req,res)=>{
  let {id}=req.params;
  let {password:newpass,username:newuser}=req.body;
  let q=`select * from user where id='${id}'`;
  try{
    connection.query(q,(err,user)=>{
         if(err) throw err;
          let result=user[0];
          if(result.password!=newpass){
            res.send("WRONG PASSWORD!");
          }
          else{
            let q1=`update user set username='${newuser}' where id='${id}';`;
            connection.query(q1,(err,success)=>{
                   if(err) throw err;
                   res.redirect("http://localhost:8080/users");
            });
          }
       });
}
catch(err){
 console.log(err);
 res.send("oops! sorry unable to fetch the details");
}
// connection.end();
});
app.listen("8080",()=>{
  console.log("i am listening");
});
// try{
  //       connection.query(q,[data],(err,result)=>{
  //            if(err) throw err;
  //            console.log(result);
  //       });  
  
  //     }
  // catch(err){
  //    console.log(err);
  // }
  // connection.end();