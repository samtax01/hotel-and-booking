const _ = require('lodash');
const HotelRepository = require('./HotelRepository');
const {pagination, page} = require('../utils/helpers');
const mongoose = require('mongoose');
const book = require('../models/booking');
const hotel = require('../models/hotel');

class BookingRepository {

    constructor() {
        this.hotelModel = mongoose.model('Hotel');
        this.bookingModel = mongoose.model('Booking');
    }

    async createBooking(data) {
        let hotelInfo = await this.hotelModel.findOne({hotelId: data.hotel}).exec();
        if(!hotelInfo)
            throw new Error(`Hotel ID ${data.hotel} not found in the system. Please only book hotel with a valid ID. Run 'fetch nearby hotel endpoint' to pick a valid hotel ID`);
        return await this.bookingModel.create([data]);
    }

    /**
     * List all booking under a particular Hotel
     *
     * @param hotelId
     * @returns {Promise<*>}
     */
    async getHotelBooking(hotelId = null) {
        let hotelInfo = await this.hotelModel.findOne({hotelId}).exec();
        if(!hotelInfo)
            throw new Error(`Hotel with id ${hotelId} not found in the system. Please only book hotel with a valid ID`);
        let customers = (await this.bookingModel.find({hotel: hotelId}).sort({createdAt: -1}).exec());
        return {
            hotelInfo,
            customers
        }
    }

}

module.exports = BookingRepository;
