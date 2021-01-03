const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jwt-simple');
const softDelete = require('mongoose-delete');

let UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        //required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        sparse: true
    },
    password: {type: String, select: false},
    phone_number: {
        type: String,
        // index: true,
        unique: true,
        // trim: true,
        // sparse: true
    },
    account_type: String,
    role_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role',
        //required:true
    },
    company_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    preferences: {
        type: Object,
        required: false
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
      }
});


UserSchema.plugin(softDelete, {deletedAt: true, validateBeforeDelete: true, overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });

UserSchema.virtual('role', {
    ref: 'Role',
    localField: 'role_id',
    foreignField: '_id',
    justOne: true
});

UserSchema.virtual('company', {
    ref: 'Company',
    localField: 'company_id',
    foreignField: '_id',
    justOne: true
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.validPassword = async function (candidatePassword) {
    const result = await bcrypt.compare(candidatePassword, this.password);
    return result;
};

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

UserSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};


UserSchema.pre('save', function (next) {
    this.log('saving user...');
    next();
});

UserSchema.post('save', function (doc) {
    this.log('user saved!');
});

UserSchema.method('log', function (message) {
    console.log('log: ' + message);
});




module.exports = mongoose.model('User', UserSchema, 'users');
