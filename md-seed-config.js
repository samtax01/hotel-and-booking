const mongoose = require('mongoose');
const Roles = require(__dirname + '/app/modules/common/api/v1/seeders/RoleSeeder');
const Users = require(__dirname + '/app/modules/common/api/v1/seeders/UserSeeder');

const config = require('./config');

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
exports.seedersList = {
    Roles,
    Users
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
exports.connect = async () =>
    await mongoose.connect(config.mongoURI, {useNewUrlParser: true});
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
exports.dropdb = async () => mongoose.connection.db.dropDatabase();
