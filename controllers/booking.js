const Booking=require("../models/booking");
const Listing=require("../models/listing");

let checkConflict=async (checkIn,checkOut,listingId,excludeBookingId=null)=>{
     const query={
        listing:listingId,
        status:"confirmed",
        checkOut:{$gt:checkIn},
        checkIn:{$lt:checkOut}
     };
     if(excludeBookingId){
        query._id = { $ne : excludeBookingId}
     }
     const conflict=await Booking.findOne(query);
     return !!conflict;
}

module.exports.savaBooking=async (req,res)=>{
    let listingId=req.params.id;
    let listing=await Listing.findById(listingId);
    if(!listing){
         req.flash("error","Unable to find listing id");
         res.redirect("/listings");
         return;
    }
    
    let {checkIn,checkOut}=req.body.booking;
    const checkInDate=new Date(checkIn);
    const checkOutDate=new Date(checkOut);

    if(checkInDate<new Date().setHours(0,0,0,0)){
        req.flash("error","check-in date should be valid");
         res.redirect(`/listings/${listingId}`);
         return;
    }
    
    let user=res.locals.currUser;
    if(!user){
         req.flash("error","please login to proceed");
         res.redirect("/login");
         return;
    }
    
    const conflict=await checkConflict(checkIn,checkOut,listingId,);
    if(conflict){
         req.flash("error", "Those dates are already booked. Try different dates.");
         res.redirect(`/listings/${listingId}`);
         return;
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const price=nights*listing.price;

    let b1=new Booking({checkIn,checkOut,listing,user,price});
    await b1.save();
    req.flash("success","Booking Confirmed");
     res.redirect(`/listings/${listingId}`);
}

module.exports.renderAllBookings=async (req,res)=>{

     let user=res.locals.currUser;
    let bookings=await Booking.find({user:user}).populate("listing").sort({ checkIn: 1 });;

    res.render("listings/myBooking.ejs",{bookings});
    //    res.send(`${bookings}`) 
    // let bookings
}

module.exports.cancelBooking=async (req,res)=>{
    let {id}=req.params;
    let booking=await Booking.findById(id);
    booking.status="cancelled";
    await booking.save();
    req.flash("success", "Booking cancelled");
    res.redirect("/bookings/myBookings");
}
