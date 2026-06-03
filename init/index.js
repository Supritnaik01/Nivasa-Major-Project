const mongoose=require("mongoose");
const initData=require("./data");
const Listing=require("../models/listing.js");
let MONGO_URL="mongodb://127.0.0.1:27017/nivasa";

main().then(()=>console.log("connected")).catch((err)=>console.log("not connected"));
async function main(){
    await mongoose.connect(MONGO_URL);
}
async function init(){
    await Listing.deleteMany({});
   await Listing.insertMany(initData.data);
}
init();
