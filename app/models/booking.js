const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');

let BookingSchema = new mongoose.Schema({
    hotel: {
        type: Number,//mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        foreignField: 'hotelId',
        justOne: true
    },
    customerFullName: String,
    customerPhoneNumber: String,
    customerEmail: String,
    fromDate: String,
    toDate: String,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});


BookingSchema.plugin(softDelete, {deletedAt: true, validateBeforeDelete: true, overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });


/*BookingSchema.virtual('hotels', {
    ref: 'Hotel',
    localField: 'hotel',
    foreignField: 'hotelId',
    justOne: true
});*/

BookingSchema.pre('save', function (next) {
    this.log('saving booking...');
    next();
});

BookingSchema.post('save', function (doc) {
    this.log('booking saved!');
});

BookingSchema.method('log', function (message) {
    console.log('log: ' + message);
});

module.exports = mongoose.model('Booking', BookingSchema, 'booking');
