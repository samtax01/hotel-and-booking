const {Seeder} = require('mongoose-data-seed');
const userModel = require('../models/user');
const roleModel = require('../models/role');
const bcrypt = require("bcryptjs");


class UserSeeder extends Seeder {
    async shouldRun() {
        return userModel.countDocuments()
            .exec()
            .then(count => count === 0);
    }

    async run() {

        const data = await this.getSeedData();
        return userModel.create(data);
    }

    async beforeRun() {
        return undefined;
    }

    async hashPassword() {
        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash('password', salt);
        return hash;
    }

    async getSeedData() {
        const password = await this.hashPassword();

        const userRole = await roleModel.findOne({name: 'super_admin'}).exec();

        const data = [
            {
                first_name: 'super',
                last_name: 'admin',
                email: 'superadmin@daaneyah.com',
                account_type: 'admin',
                role: userRole._id,
                password: password
            }
        ];

        return data;
    }

    constructor() {
        super();
    }
}

module.exports = UserSeeder;
