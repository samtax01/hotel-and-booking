
const HostelRepository = require("../repositories/HotelRepository")
const {hotelSearchFormValidation} = require('../requests/hotelValidation');
const {responseCode} = require('../utils/helpers');
let ApiResponse = require("../utils/ApiResponse");




/**
 *
 * @api {get} /hotels
 * @apiName hotels
 * @apiGroup Hotel
 * @apiVersion  0.1.0
 *
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 *  {
    "status": true,
    "message": "List of saved hotels",
    "data": [
        {
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
        }
      ]
    }
 *
 */
exports.getHotels = async (request, response) => {
    try {
        response.json(
            ApiResponse.trueData(
                await (new HostelRepository).getHotels(),
                "List of saved hotels"
            )
        );
    }catch (error) {
        return response.json(ApiResponse.falseMessage(error.message));
    }
}



/**
 *
 * @api {get} /hotels/?coordinates=1353654575,5736746749935 retrieve hostel around me
 * @apiName hotels
 * @apiGroup Hotel
 * @apiVersion  0.1.0
 *
 *
 * @apiParam  {String} coordinates Latitude and Longitude
 * @apiParam  {String} limit limit the return data
 * @apiParam  {String} lang return hotels in a specific language
 *
 * @apiParamExample  {type} Request Example:
 * {
 *     coordinates: "6.550323199999999,3.3685503999999997",
 *     limit: "10",
 *     lang: "en",
 * }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 *    {
 *       "status": true,
 *       "message": "Action Successful",
 *       "data": [
 *           {
 *               "name": "Beautiful House in the heart of Munich",
 *               "location": {
 *                   "lat": 48.13027,
 *                   "lon": 11.57806
 *               },
 *               "id": 1897718767,
 *               "locationId": 10572
 *           }
 *       ]
 *   }
 *
 * * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE_ENTITY
 *     {
 *       "status": false,
 *       "message": {
 *            "coordinates": "coordinates is required"
 *         },
 *       "data": null,
 *     }
 *
 */
exports.getNearByHotel = async (request, response) => {
    try {
        const {FormattedError, NormalizedValue} = hotelSearchFormValidation.validate(request.query);
        return FormattedError?
            response.status(responseCode.UNPROCESSABLE_ENTITY).json( ApiResponse.falseMessage(FormattedError)):
            response.json(
                ApiResponse.trueData(await (new HostelRepository).fetchHotelsByCoordinate(
                    NormalizedValue.coordinates,
                    NormalizedValue.limit,
                    NormalizedValue.lang
                ), "List of nearby hotels")
            );
    }catch (error) {
        return response.json(ApiResponse.falseMessage(error.message));
    }
}

