const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");


let MONGO_URL="mongodb://127.0.0.1:27017/nivasa";

main().then(()=>console.log("connected")).catch((err)=>console.log("not connected"));
async function main(){
    await mongoose.connect(MONGO_URL);
}
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("welcome to root");
});
//display all
app.get("/listings",async (req,res)=>{
    let listings=await Listing.find();
      res.render("listings/home.ejs",{listings});
});
//new
app.get("/listings/new",async (req,res)=>{
      res.render("listings/new.ejs");
});
//save
app.post("/listings",async (req,res)=>{
   let l1=  new Listing({...req.body.listing});
    await l1.save();
    res.redirect("/listings");
});


//show
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
      res.render("listings/show.ejs",{listing});
});

//edit
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});
app.delete("/listings/:id",async (req,res)=>{
   let {id}=req.params;
   await Listing.deleteOne({_id:id});
    res.redirect("/listings");
});
app.put("/listings/:id",async (req,res)=>{
let {id}=req.params;
await Listing.updateOne({_id:id},{...req.body.listing});
res.redirect("/listings");
});

app.listen(8080,()=>{
    console.log("server is listening..");
});
