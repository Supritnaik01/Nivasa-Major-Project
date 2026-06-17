const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js")


//display all
router.get("/", wrapAsync(listingController.renderAllListings));

//new
router.get("/new",isLoggedIn, listingController.renderCreateNewForm);

//save
router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.saveListing));

//show
router.get("/:id",wrapAsync(listingController.showListing));

//edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//update
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

//delete
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

module.exports=router;