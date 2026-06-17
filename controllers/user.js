const User=require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signupUser=async (req,res)=>{
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
    
  }catch(err){
    req.flash("error",err.message);
    res.redirect("/signup");
        
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.loginUser=(req,res)=>{
    req.flash("successMsg","Welcome back to Nivasa");
    if(res.locals.originalUrl){
     return res.redirect(res.locals.originalUrl);
    }else{
    res.redirect("/listings");
    }
}
  
module.exports.logoutUser=(req,res)=>{
    req.logout((err)=>{
        if(err){
          return next(err);
        }
     req.flash("successMsg","you logged Out");
     res.redirect("/listings");
    });
}