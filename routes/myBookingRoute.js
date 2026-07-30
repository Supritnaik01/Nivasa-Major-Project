const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,validateBooking,isOwnerOfBooking}=require("../middleware.js");
const bookingController=require("../controllers/booking.js");

router.route("/myBookings")
.get(isLoggedIn,bookingController.renderAllBookings)

router.route("/:id")
.delete(isLoggedIn,isOwnerOfBooking,bookingController.cancelBooking)

module.exports=router







