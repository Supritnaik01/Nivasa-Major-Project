const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveUrl}=require("../middleware.js")
const userController=require("../controllers/user.js")

//sigup form
router.get("/signup",userController.renderSignupForm);

//signup user
router.post("/signup",wrapAsync(userController.signupUser));

//login form
router.get("/login",userController.renderLoginForm);

//login user
router.post("/login",saveUrl, passport.authenticate("local",{ failureRedirect: '/login' ,failureFlash:true}),userController.loginUser);

//logout user
router.get("/logout",userController.logoutUser);

module.exports=router;