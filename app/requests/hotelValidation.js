const Joi = require('joi');
const FormValidator = require('../utils/formValidator');

exports.hotelSearchFormValidation = new FormValidator({
    coordinates: Joi.string().min(6).required(),
    limit: Joi.number().allow('').optional().default(10),
    lang: Joi.string().allow('').optional().default("en"),
});


exports.hotelBookingCreateFormValidation = new FormValidator({
    hotel: Joi.number().required(),
    customerFullName: Joi.string().required(),
    customerPhoneNumber: Joi.string().required(),
    customerEmail: Joi.string().email({tlds: {allow: false}}).required(),
    fromDate: Joi.string().required(),
    toDate: Joi.string().required(),
});


exports.hotelBookingGetFormValidation = new FormValidator({
    hotelId: Joi.number().required(),
});
