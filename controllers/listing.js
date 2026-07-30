const Listing=require("../models/listing.js");

module.exports.renderAllListings=async (req,res)=>{
 const { categories } = req.query;
     let filter = {};
    let showFilterNavBar=true;
    if (categories) {
     const categoryArray = categories.split(',');
     filter = { categories : { $all: categoryArray } };
    }

let listings = await Listing.find(filter);
res.render("listings/home.ejs", { listings ,showFilterNavBar});
}

module.exports.renderCreateNewForm=(req,res)=>{
      res.render("listings/new.ejs");
}

module.exports.saveListing=async (req,res)=>{
    
    let l1=  new Listing({...req.body.listing});
    l1.image.url=req.file.path;
    l1.image.filename=req.file.filename;
    l1.owner=req.user._id;
    await l1.save();
    req.flash("successMsg","new listing added");
    res.redirect("/listings");
}

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(listing){
    res.render("listings/show.ejs",{listing});
    }else{
         req.flash("error","Unable to find listing id");
         res.redirect("/listings");
    }
}

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(listing){
        res.render("listings/edit.ejs",{listing});
    }else{
      req.flash("error","Unable to find listing id");
      res.redirect("/listings");
    }
}
module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing},{ new: true });

    if(typeof req.file != "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    res.redirect("/listings");
}

module.exports.deleteListing=async (req,res)=>{
   let {id}=req.params;
   await Listing.findOneAndDelete({_id:id});
   req.flash("error","Listing was deleted");
   res.redirect("/listings");
}

module.exports.showMyListing=async (req,res)=>{
  
    // let {userid}=req.params;
    let userid=res.locals.currUser;
    let listings=await Listing.find({owner:userid});
    let showFilterNavBar=false;
    res.render("listings/home.ejs",{listings,showFilterNavBar});
}