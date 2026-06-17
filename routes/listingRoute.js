const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
// const {}=require("../schema.js");
// const flash=require("connect-flash");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");



//display all
router.get("/", wrapAsync(async (req,res)=>{
      let listings=await Listing.find();
      res.render("listings/home.ejs",{listings});
}));

//new
router.get("/new",isLoggedIn, (req,res)=>{
      res.render("listings/new.ejs");
});

//save
router.post("/",isLoggedIn,validateListing,wrapAsync(async (req,res)=>{
    let l1=  new Listing({...req.body.listing});
    l1.owner=req.user._id;
    await l1.save();
    req.flash("successMsg","new listing added");
    res.redirect("/listings");
}));


//show
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(listing){
    res.render("listings/show.ejs",{listing});
    }else{
         req.flash("error","Unable to find listing id");
         res.redirect("/listings");
    }
}));

//edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
if(listing){
    res.render("listings/edit.ejs",{listing});
}else{
     req.flash("error","Unable to find listing id");
      res.redirect("/listings");
}
}));

//delete
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
   let {id}=req.params;
   await Listing.findOneAndDelete({_id:id});
   req.flash("deleteMsg","Listing was deleted");
   res.redirect("/listings");
}));

//update
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.updateOne({_id:id},{...req.body.listing});
    res.redirect("/listings");
}));


module.exports=router;