const mongoose=require("mongoose");
const review = require("./review");
const { ref } = require("joi");
const schema=mongoose.Schema;
const listingSchema=new schema({
    title:{
      type:  String,
      required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        filename:String,
        url:{
        type:String,
        default:"https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
       set: (v) =>
    v === ""
        ? "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v
    }},
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[{
        type:schema.Types.ObjectId,
        ref:"Review"

    }]
});
const listing=mongoose.model("listing",listingSchema);
module.exports=listing;