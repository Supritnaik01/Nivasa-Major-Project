const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js")



router.route("/")
.get(wrapAsync(listingController.renderAllListings))    //display all
.post(isLoggedIn,validateListing,wrapAsync(listingController.saveListing));   //save

//new
router.get("/new",isLoggedIn, listingController.renderCreateNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))     //show
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))   //update
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));                  //delete
//edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports=router;