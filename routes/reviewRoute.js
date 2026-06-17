const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {validateReview,isLoggedIn,isAuthor}=require("../middleware.js");

//save review
  router.post("/",isLoggedIn,validateReview,wrapAsync(async (req,res)=>{
    let id=req.params.id;
   let listing=await Listing.findById(id);
   let newReview=new Review(req.body.review);
   console.log(res.locals.currUser," ..  ",req.user);
   newReview.author=res.locals.currUser;
     listing.reviews.push(newReview);
  await  newReview.save();
   await listing.save();
   req.flash("successMsg","new review added");
   res.redirect(`/listings/${id}`);
  }
));
 
  router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(async (req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("deleteMsg","review was deleted");
    res.redirect(`/listings/${id}`);
  }));
  module.exports=router;