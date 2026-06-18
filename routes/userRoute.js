const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveUrl}=require("../middleware.js")
const userController=require("../controllers/user.js")


router.route("/signup")
.get(userController.renderSignupForm)      //sigup form
.post(wrapAsync(userController.signupUser));   //signup user

router

//login form
router.route("/login")
.get(userController.renderLoginForm)
.post(saveUrl, passport.authenticate("local",{ failureRedirect: '/login' ,failureFlash:true}),userController.loginUser);  //login user

router

//logout user
router.get("/logout",userController.logoutUser);

module.exports=router;