const mongoose=require("mongoose");
const initData=require("./data");
const Listing=require("../models/listing.js");
let DB_URL='';

main().then(()=>console.log("connected")).catch((err)=>console.log("not connected"));
async function main(){
    await mongoose.connect(DB_URL);
}
async function init(){
    // await Listing.deleteMany({});
    initData.data=initData.data.map((el)=>({...el,owner:'6a393196ed69b5d9cf139411'}));
    // console.log(initData.data);
   await Listing.insertMany(initData.data);
}
init();
