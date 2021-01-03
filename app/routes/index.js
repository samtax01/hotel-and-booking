let router = require('express').Router();
let ApiResponse = require("../utils/ApiResponse");
const {getNearByHotel, getHotels} = require("../controllers/hotelController");
const {getHotelBooking} = require("../controllers/bookingController");
const {createBooking} = require("../controllers/bookingController");

router.get('/', function (req, res) {
    res.json(ApiResponse.trueData("Api is working..."));
});


// User Auth
//router.use('/customer', require('./auth'));

// get all saved hotel
router.get('/hotels', getHotels);

// search hotel by coordinate
router.get('/hotels/search', getNearByHotel);

// Book hotel
router.post('/booking', createBooking);

// get all booking under hotel
router.get('/booking/:hotelId', getHotelBooking);

module.exports = router;
