const _ = require('lodash');
const mongoose = require('mongoose');
const HotelRepository = require('./HotelRepository');
const {pagination, page} = require('../utils/helpers');

class BookingRepository {

    constructor() {
        this.hotelModel = mongoose.model('Hotel');
        this.bookingModel = mongoose.model('Booking');
    }

    async createBooking(data) {
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
        let customers = (await this.bookingModel.find({hotel: hotelId}).sort({createdAt: -1}).exec());
        return {
            hotelInfo,
            customers
        }
    }

}

module.exports = BookingRepository;
