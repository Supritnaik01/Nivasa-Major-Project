const mongoose=require("mongoose");
const { required } = require("joi");
const schema=mongoose.Schema;
const bookingSchema=new schema({
    listing:{
        type:schema.Types.ObjectId,
        ref:"listing",
        required:true,
    },
    user:{
        type:schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    checkIn:{
        type:Date,
        required:true,
    },
    checkOut:{
        type:Date,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["confirmed","cancelled"],
        default:"confirmed",
    },
},
{timestamps:true});
// bookingSchema.pre("validate", function (next){
//      if (this.checkOut <= this.checkIn) {
//         next(new Error("Check-out date must be after check-in date"));
//     } else {
//         next();
//     }
// });
module.exports=mongoose.model("Booking",bookingSchema)