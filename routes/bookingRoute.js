const express=require("express");
const router=express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,validateBooking}=require("../middleware.js");
const bookingController=require("../controllers/booking.js");
// const router = express.Router({ mergeParams: true });
router.route("/")
.post(isLoggedIn,validateBooking,wrapAsync(bookingController.savaBooking))

module.exports=router;