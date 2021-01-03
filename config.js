// Import env package
require("dotenv").config({silent: true});


module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/sample_api_db",
    secretKey: process.env.SECRET_KEY || '_secret_key_',
    defaultRecordsPerPage: process.env.DEFAULT_RECORDS_PER_PAGE || 10,
    defaultPage: process.env.DEFAULT_PAGE || 1,
    sentryDsn: process.env.SENTRY_DSN || "",
    authSecret: process.env.AUTH_SECRET || '_secret_key_',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    AWS_REGION: process.env.AWS_REGION || '',
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || '',
    AWS_S3URL: process.env.AWS_S3URL || '',
    HOTEL_LOOKUP_TOKEN: process.env.HOTEL_LOOKUP_TOKEN || '7f5972166154bd9538f3fa45471dd5b6'
};
