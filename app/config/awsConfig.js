'use strict';

const {successResponse, errorResponse, responseCode, serverError, pagination, page} = require('../utils/helpers');
const AWS = require('aws-sdk');
const config = require(__base +  'config');
const AWS_ACCESS_KEY_ID = config.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = config.AWS_SECRET_ACCESS_KEY ;


AWS.config.update({
    accessKeyId:AWS_ACCESS_KEY_ID,
    secretAccessKey:AWS_SECRET_ACCESS_KEY,
    region: config.AWS_REGION
})

exports.s3Bucket = new AWS.S3({params:{Bucket: config.AWS_BUCKET_NAME}});







