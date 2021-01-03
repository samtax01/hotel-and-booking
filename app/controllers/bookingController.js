
const BookingRepository = require("../repositories/BookingRepository")
const {hotelBookingCreateFormValidation, hotelBookingGetFormValidation} = require('../requests/hotelValidation');
const {responseCode} = require('../utils/helpers');
let ApiResponse = require("../utils/ApiResponse");






/**
 *
 * Create Booking
 * @api {post} /booking
 * @apiName hotels
 * @apiGroup Hotel
 * @apiVersion  0.1.0
 *
 *
 * @apiParamExample  {type} Request Example:
     {
      "hotel": 1912467201,
      "customerFullName": "Samson Oyetola",
      "customerPhoneNumber": "+2347087474483",
      "customerEmail": "hello@samsonoyetola.com",
      "fromDate": "12/01/2021",
      "toDate": "14/01/2021"
    }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "Booked successfully",
    "data": [
        {
            "_id": "5ff20a867532b71a37f5762f",
            "deleted": false,
            "hotel": 1912467201,
            "customerFullName": "Samson Oyetola",
            "customerPhoneNumber": "+2347087474483",
            "customerEmail": "hello@samsonoyetola.com",
            "fromDate": "12/01/2021",
            "toDate": "14/01/2021",
            "createdAt": "2021-01-03T18:18:46.475Z",
            "updatedAt": "2021-01-03T18:18:46.475Z",
            "__v": 0,
            "id": "5ff20a867532b71a37f5762f"
        }
    ]
}
 *
 * * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE_ENTITY
     {
        "status": false,
        "message": {
            "hotel": "hotel id is required",
            "customerFullName": "customerFullName is required",
            "customerPhoneNumber": "customerPhoneNumber is required",
            "customerEmail": "customerEmail is required",
            "fromDate": "fromDate is required",
            "toDate": "toDate is required"
        },
        "data": null
    }
 *
 */
exports.createBooking = async (request, response) => {
    const {FormattedError, NormalizedValue} = hotelBookingCreateFormValidation.validate(request.body);
    try {
        return FormattedError?
            response.status(responseCode.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(FormattedError)):
            response.json(
                ApiResponse.trueData(
                    await (new BookingRepository).createBooking(NormalizedValue),
                    "Booked successfully"
                )
            );
    }catch (error) {
        return response.json(ApiResponse.falseMessage(error.message));
    }
}







/**
 *
 * View Bookings under a particular hotel
 * @api {post} /booking/:hotelId
 * @apiName hotels
 * @apiGroup Hotel
 * @apiVersion  0.1.0
 *
 *
 * @apiParamExample  {type} Request Example:
 {
      "hotel": 1912467201,
      "customerFullName": "Samson Oyetola",
      "customerPhoneNumber": "+2347087474483",
      "customerEmail": "hello@samsonoyetola.com",
      "fromDate": "12/01/2021",
      "toDate": "14/01/2021"
    }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "Hotel Booked Record",
    "data": {
        "hotelInfo": {
            "deleted": false,
            "_id": "5ff1f9a4e14e3499e159c827",
            "location": {
                "lon": 11.57801,
                "lat": 48.13309
            },
            "name": "Deluxe Apartment Munich' s Heart",
            "locationId": 10572,
            "hotelId": "1912467201",
            "createdAt": "2021-01-03T17:06:44.492Z",
            "updatedAt": "2021-01-03T17:06:44.492Z",
            "__v": 0,
            "id": "5ff1f9a4e14e3499e159c827"
        },
        "customers": [
            {
                "deleted": false,
                "_id": "5ff20a867532b71a37f5762f",
                "hotel": 1912467201,
                "customerFullName": "Samson Oyetola",
                "customerPhoneNumber": "+2347087474483",
                "customerEmail": "hello@samsonoyetola.com",
                "fromDate": "12/01/2021",
                "toDate": "14/01/2021",
                "createdAt": "2021-01-03T18:18:46.475Z",
                "updatedAt": "2021-01-03T18:18:46.475Z",
                "__v": 0,
                "id": "5ff20a867532b71a37f5762f"
            },
         ]
       }
    ]
}
 *
 * * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE_ENTITY
     {
        "status": false,
        "message": {
            "hotelId": "hotelId must be a number"
        },
        "data": null
    }
 *
 */
exports.getHotelBooking = async (request, response) => {
    const {FormattedError, NormalizedValue} = hotelBookingGetFormValidation.validate(request.params);
    try {
        return FormattedError?
            response.status(responseCode.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(FormattedError)):
            response.json(
                ApiResponse.trueData(
                    await (new BookingRepository).getHotelBooking(NormalizedValue.hotelId),
                    "Hotel Booked Record"
                )
            );
    }catch (error) {
        return response.json(ApiResponse.falseMessage(error.message));
    }
}
