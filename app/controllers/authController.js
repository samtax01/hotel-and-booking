'use strict';

const UserRepository = require('../repositories/UserRepository');
const {responseCode, errorResponse, successResponse} = require('../utils/helpers');
const customerValidation = require('../requests/signupValdation');
const jwt = require('jwt-simple');
const config = require('/config');

/**
 *
 * @api {post} /customer/auth/signup Create Customer
 * @apiName CreateCustomer
 * @apiGroup Customer Account
 * @apiVersion  0.1.0
 *
 *
 *
 * @apiParam  {String} first_name Customer First Name
 * @apiParam  {String} last_name Customer Last Name
 * @apiParam  {String} email Customer Email
 * @apiParam  {String} phone_number Customer Phone Number
 *
 *
 *
 * @apiParamExample  {type} Request Example:
 * {
 *     first_name: "John",
 *     last_name: "Doe",
 *     phone_number: "09090909090"
 * }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 201 Created
 * {
 *       "status": "success",
 *       "message": "Customer created successfully",
 *       "data": {
 *           "first_name": "John",
 *           "last_name": "Doe",
 *           "phone_number": "07083415383",
 *           "account_type": "user",
 *           "role": "5f7ffb25358ab9520f45714d",
 *           "createdAt": "2020-10-11T18:29:28.129Z",
 *           "updatedAt": "2020-10-11T18:29:28.129Z",
 *           "id": "5f834f0879a507c66664c409"
 *       }
 *   }
 *
 * @apiErrorExample {json} Error-Response: When empty fields are sent
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *          "status": "error",
 *           "message": "Validation Error",
 *           "errors": {
 *               "first_name": "first_name is required",
 *               "last_name": "last_name is required",
 *               "phone_number": "phone_number is required"
 *           }
 *       }
 *
 *
 *
 *   @apiErrorExample {json} Error-Response: Phone number already exist
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *         "status": "error",
 *           "message": "The user phone number has already been taken ",
 *           "errors": {}
 *     }
 *
 */
exports.signUp = async (request, response) => {
    try {
        const customerReqBody = request.body;
        const {FormattedError, NormalizedValue} = customerValidation.validate(customerReqBody);

        if (FormattedError) {
            return errorResponse(response, responseCode.UNPROCESSABLE_ENTITY, 'Validation Error', FormattedError);
        } else {

            const customer = await (new UserRepository).createUserByPhone(NormalizedValue);

            if (customer.error)
                return errorResponse(response, responseCode.UNPROCESSABLE_ENTITY, customer.error);
            return successResponse(response, responseCode.CREATED, 'Customer created successfully', customer);
        }
    } catch (error) {
        return errorResponse(response, responseCode.UNPROCESSABLE_ENTITY, 'Error creating customer now ' + error, error);
    }
};



/**
 *
 * @api {post} /customer/auth/login Customer Login
 * @apiName customerLogin
 * @apiGroup Customer Auth
 * @apiVersion  0.1.0
 *
 *
 * @apiParam  {String} phone Customer Phone
 *
 *
 * @apiParamExample  {type} Request Example:
 * {
 *     phone: "09000909099",
 * }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 * {
 *       status: "success",
 *       message: ""OTP Sent to 0909090909,
 *       data: {}
 *
 * }
 *
 *
 * @apiErrorExample {json} Error-Response: When no phone number is provided
 * HTTP/1.1 404 UNAUTHORIZED
 * {
 *       "status": "error",
 *       "message": "Validation Error",
 *       "errors": {
 *           "phone": "phone is required"
 *       }
 *   }
 *
 *
 *
 *
 *
 * @apiErrorExample {json} Error-Response: When phone number does not exist
 *     HTTP/1.1 401 UNAUTHORIZED
 *     {
 *       "status": "error",
         "message": "Customer Not Found"
 *     }
 *
 */

exports.login = async (request, response) => {
    const reqBody = request.body;

    const {
        FormattedError, NormalizedValue
    } = sendOTPRequest.validate(reqBody);

    if (FormattedError)
        return errorResponse(
            response,
            response.UNPROCESSABLE_ENTITY,
            'Validation Error',
            FormattedError
        );

    const user = await (new UserRepository).getUserByPhoneNumber(NormalizedValue.phone_number);

    if (!user)
        return errorResponse(response, responseCode.UNAUTHORIZED, 'Customer Not Found');

    if (user.account_type !== "user")
        return errorResponse(response, responseCode.UNAUTHORIZED, 'Invalid User Type.');

    return successResponse(response, responseCode.SUCCESS, 'OTP Sent to ' + NormalizedValue.phone_number);
};


/**
 *
 * @api {post} /customer/auth/verify-otp Verify OTP
 * @apiName verifyOTP
 * @apiGroup Customer Auth
 * @apiVersion  0.1.0
 *
 *
 * @apiParam  {String} phone_number Customer Phone
 * @apiParam  {String} otp  OTP Code
 *
 *
 * @apiParamExample  {type} Request Example:
 * {
 *     phone_number: "09000909099",
 *     otp: "0000"
 * }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 * {
 *       status: "success",
 *       message: "Login Successful",
 *        data: {
 *               token: "37dab215-024f-406f-a9f6-24330a5f931d",
 *               user: {
 *                       id: "5f5fc2d8da04a488821aa824"",
 *                       first_name: "John",
 *                       last_name: "Doe",
 *                       email: "john@doe.com",
 *                       phone_number: "09090909090"
 *                       account_type: "user",
 *                       role: "5f5fc2d8da04a488821aa828""
 *                   }
 *           }
 *
 * }
 *
 * * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 UNAUTHORIZED
 *     {
 *       "status": "error",
         "message": "Customer Not Found"
 *     }
 *
 */
exports.verifyOTP = async (request, response) => {
    const reqBody = request.body;

    const {
        FormattedError, NormalizedValue
    } = verifyOTPRequest.validate(reqBody);

    if (FormattedError)
        return errorResponse(
            response,
            response.UNPROCESSABLE_ENTITY,
            'Validation Error',
            FormattedError
        );

    const user = await (new UserRepository).getUserByPhoneNumber(NormalizedValue.phone_number);

    if (!user)
        return errorResponse(response, responseCode.UNAUTHORIZED, 'User Not Found');

    if (NormalizedValue.otp !== '0000')
        return errorResponse(response, responseCode.UNAUTHORIZED, 'Invalid OTP.');

    const token =  jwt.encode(user, config.authSecret);
    return successResponse(response, responseCode.SUCCESS, 'Login Successful', {token, user,request: NormalizedValue});
};
