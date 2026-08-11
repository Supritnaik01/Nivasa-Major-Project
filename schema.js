const Joi=require("joi");
module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image: Joi.object({
            filename:Joi.string().allow("", null),
            url: Joi.string().allow("", null)
        }),
        price:Joi.number().required().min(0),
        location:Joi.string().required(),
        country:Joi.string().required(),
        coordinates: Joi.object({
            lat: Joi.number().required(),
            lon: Joi.number().required()
        }).required(),

        categories: Joi.array().items(
            Joi.string().valid(
                "rooms",
                "apartments",
                "villas",
                "beach",
                "mountains",
                "city",
                "farms",
                "camping",
                "swimming",
                "AC",
                "metro",
                "parking"
            )
        )
    }).required()
}
);
// module.exports=listingSchema;

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
});
module.exports.userSchema=Joi.object({
   user:Joi.object({
        username:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required().min(6),
    }).required()
})


module.exports.bookingSchema=Joi.object({
    booking:Joi.object({
         checkIn: Joi.date().iso().required()
            .messages({
                "any.required": "Check-in date is required",
            }),
        checkOut: Joi.date().iso().greater(Joi.ref("checkIn")).required()
            .messages({
                "date.greater": "Check-out date must be after check-in date",
                "any.required": "Check-out date is required",
            }),
    }).required()
})