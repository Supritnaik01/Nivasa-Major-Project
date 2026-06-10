const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listing=require("./routes/listing.js");
const review=require("./routes/review.js");

let MONGO_URL="mongodb://127.0.0.1:27017/nivasa";

main().then(()=>console.log("connected"))
.catch((err)=>console.log("not connected"));

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

app.use("/listings",listing);
app.use("/listings/:id/review",review);
  
app.all("/{*splat}",(req,res,next)=>{
  next(new ExpressError(404,"page not found"));
});

app.use((err, req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    // console.log(req.method, req.url); 
    // console.log(err);
    res.status(statusCode).render("error.ejs",{message}); 
});
app.listen(8080,()=>{
    console.log("server is listening..");
});
