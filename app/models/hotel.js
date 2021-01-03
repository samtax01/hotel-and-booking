const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');

let HotelSchema = new mongoose.Schema({
    name: String,
    hotelId: {
        type: String,
        unique : true,
        required : true,
        dropDups: true
    },
    location: {
        type: Object,
        required: false
    },
    locationId: Number,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
      }
});



HotelSchema.plugin(softDelete, {deletedAt: true, validateBeforeDelete: true, overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });


HotelSchema.pre('save', function (next) {
    this.log('saving hotel...');
    next();
});

HotelSchema.post('save', function (doc) {
    this.log('hotel saved!');
});

HotelSchema.method('log', function (message) {
    console.log('log: ' + message);
});



module.exports = mongoose.model('Hotel', HotelSchema, 'hotels');
