const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const User=require("../models/user.js");
const passport = require("passport");
const {saveUrl}=require("../middleware.js")

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});
router.post("/signup",wrapAsync(async (req,res)=>{
    try{
    let {username,email,password}=req.body.user;
    let user=new User({username,email});
    let registeredUser=await User.register(user,password);
    req.login(registeredUser,(err)=>{
       if(err){
          return next(err);
        }
       req.flash("successMsg","Welcome to Nivasa");
       return res.redirect("/listings");
    });
    // res.redirect("/listings");
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
        
    }
}));

 router.get("/login",(req,res)=>{
    
    res.render("users/login.ejs");
  });

  router.post("/login",saveUrl,passport.authenticate("local",{ failureRedirect: '/login' ,failureFlash:true}),(req,res)=>{
    req.flash("successMsg","Welcome back to Nivasa");
    console.log(res.locals.originalUrl);
    if(res.locals.originalUrl){
     return res.redirect(res.locals.originalUrl);
    }else{
    res.redirect("/listings");
    }
  });
  router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
          return next(err);
        }
    req.flash("successMsg","you logged Out");
    res.redirect("/listings");
    });
});
module.exports=router;