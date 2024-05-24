const mongoose=require("mongoose");
const Chat=require("./models/chats.js");

main().then(()=>{
    console.log("connections successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let chats=[
    {
    from:"abhishek",
    to:"kcr",
    msg:"jai telangana ",
    created_at:new Date(),
   },
   {
    from:"abhi",
    to:"ka paul",
    msg:"jai ka paul",
    created_at:new Date(),
   },
   {
    from:"abhishek",
    to:"uma",
    msg:"jai uma mahesh",
    created_at:new Date(),
   },
];
Chat.insertMany(chats);
