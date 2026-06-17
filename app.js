const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listingRoute=require("./routes/listingRoute.js");
const reviewRoute=require("./routes/reviewRoute.js");
const userRoute=require("./routes/userRoute.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");

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

let sessionOption={
    secret:"my superSecreatcode",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }
};
app.get("/",(req,res)=>{
    res.send("welcome to root");
});

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("successMsg");
    res.locals.deleteMsg=req.flash("deleteMsg");
    res.locals.errorMsg=req.flash("error");
    res.locals.currUser=req.user;
    
    // console.log(req.success);
    
    next();
 });


app.use("/listings",listingRoute);
app.use("/listings/:id/review",reviewRoute);
app.use("/",userRoute);
  
app.all("/{*splat}",(req,res,next)=>{
  next(new ExpressError(404,"page not found"));
});

app.use((err, req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    // console.log(req.method, req.url); 
    console.log(err);
    res.status(statusCode).render("error.ejs",{message}); 
});
app.listen(8080,()=>{
    console.log("server is listening..");
});
