    const _ = require('lodash');
    const axios = require('axios');
    const config = require(__base + "config");
    const {pagination, page} = require('../utils/helpers');
    const mongoose = require('mongoose');
    const book = require('../models/booking');
    const hotel = require('../models/hotel');


    class HotelRepository {

        /**
         * Init
         */
        constructor() {
           this.hotelModel = mongoose.model('Hotel');
        }


        /**
         * Saved Fetched hotels to the database for booking purposes
         *
         * @param data
         */
        addHotels(data) {
            this.hotelModel.create(data);
        };


        /**
         * List all hotel
         *
         * @returns {Promise<*>}
         */
        async getHotels(filter = {}, skip = 0, currentPage = 0) {
            skip = pagination(skip);
            currentPage = page(currentPage);
            return await this.hotelModel.find(filter)
                //.populate('role')
                //.populate('company')
                .skip((currentPage - 1) * skip)
                .limit(skip)
                .sort({createdAt: -1})
                .exec();
        }


        /**
         * Get List of Hotel using hotellook API.
         *
         * @returns ApiResponse
         * @param coordinates
         * @param limit
         * @param lang
         */
        async fetchHotelsByCoordinate(coordinates, limit = 10, lang = "en") {
            console.log("Searching coordinate", coordinates);
            let rawHotels = (await axios.get("http://engine.hotellook.com/api/v2/lookup.json", {
                params: {
                    query: coordinates,
                    lookFor:"both",
                    lang,
                    limit,
                    token: config.HOTEL_LOOKUP_TOKEN
                }
            })).data;

            // is status valid
           if(rawHotels.status !== "ok")
               throw new Error("Unable to fetch hotels at the moment");

           // fetch useful data
           let hotels = rawHotels.results.hotels.map((hotel)=> {
               hotel["hotelId"] = hotel.id;
               return hotel;
           });

           // is data not empty
           if(hotels.length === 0)
                throw new Error(`No Hotel found within this coordinate ${coordinates}` );

           // catch to database
           this.addHotels(hotels)

           // return consolidated data
           console.log("Found Hotels", hotels);
           return hotels;
        }

    }


    module.exports =  HotelRepository;
