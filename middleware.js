const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const Booking=require("./models/booking.js")
const {reviewSchema,listingSchema,userSchema,bookingSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js")

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.originalUrl=req.originalUrl;
        //  console.log(req.session.originalUrl);
        req.flash("error","you must be logged In");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveUrl=(req,res,next)=>{
    // console.log(req)
    if(req.session.originalUrl){
        res.locals.originalUrl=req.session.originalUrl;
    }
    next();
}
module.exports.isOwner=async (req,res,next)=>{
     let {id}=req.params;
     let listing=await Listing.findById(id);
    //  console.log(res.locals.currUser);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you do not have permission to do this action");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.validateListing=(req,res,next)=>{
    // console.log(req.body);
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errorMsg=error.details.map((el)=>el.message).join(",");
      throw(new ExpressError(400,errorMsg));
    }else{
      next();
    }
 };
 module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
      let errorMsg=error.details.map((el)=>el.message).join(",");
      throw(new ExpressError(400,errorMsg));
    }else{
      next();
    }
 };

  module.exports.validateUser=(req,res,next)=>{
    let {error}=userSchema.validate(req.body);
    if(error){
      let errorMsg=error.details.map((el)=>el.message).join(",");
      throw(new ExpressError(400,errorMsg));
    }else{
      next();
    }
 };

 module.exports.isAuthor=async (req,res,next)=>{
     let {id,reviewId}=req.params;
     let review=await Review.findById(reviewId);
    //  console.log(res.locals.currUser);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you do not have permission to do this action");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateBooking=async (req,res,next)=>{
    const { error } = bookingSchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errorMsg);
    }
    next();
}

module.exports.isOwnerOfBooking=async (req,res,next)=>{
     let {id}=req.params;
     let booking=await Booking.findById(id);
     if (!booking) {
        req.flash("error", "Booking not found");
        return res.redirect("/bookings");
    }
    //  console.log(res.locals.currUser);
    if(!booking.user.equals(res.locals.currUser._id)){
        req.flash("error","you do not have permission to do this action");
        return res.redirect(`/listings/myBookings`);
    }
    next();
}