const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");


const validateListing=(req,res,next)=>{
    // console.log(req.body);
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errorMsg=error.details.map((el)=>el.message).join(",");
      throw(new ExpressError(400,errorMsg));
    }else{
      next();
    }
 };

//display all
router.get("/", wrapAsync(async (req,res)=>{
      let listings=await Listing.find();
      res.render("listings/home.ejs",{listings});
}));

//new
router.get("/new", (req,res)=>{
      res.render("listings/new.ejs");
});

//save
router.post("/",validateListing,wrapAsync(async (req,res)=>{
    let l1=  new Listing({...req.body.listing});
    await l1.save();
    res.redirect("/listings");
}));


//show
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}));

//edit
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//delete
router.delete("/:id",wrapAsync(async (req,res)=>{
   let {id}=req.params;
   await Listing.findOneAndDelete({_id:id});
   res.redirect("/listings");
}));

//update
router.put("/:id",validateListing,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.updateOne({_id:id},{...req.body.listing});
    res.redirect("/listings");
}));

module.exports=router;