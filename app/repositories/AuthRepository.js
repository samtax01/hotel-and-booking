const userModelData = require('../models/user');
const mongoose = require('mongoose');


class AuthRepository {

    // userModel;

    constructor() {
        this.userModel = mongoose.model('User');
    }

    async login(email, password) {
        const userData = await this.userModel.findOne({email}).select('+password')
            .then(async (user) => {
                if (!user) return {error: 'Invalid Email'}
                const confirmPass = await user.validPassword(password);
                if (!(confirmPass)) return {error: 'Invalid Password'}
                return {success: 'Login  Successful', user};
            });
        return userData;
    }

    async passwordReset(data) {
        return 'Password Reset successful';
    };
}

module.exports = AuthRepository;

