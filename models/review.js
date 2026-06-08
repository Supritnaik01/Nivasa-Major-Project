const mongoose=require("mongoose");
const { type } = require("../schema");
const schema=mongoose.Schema;
const reviewSchema=new schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model("Review",reviewSchema);