const axios = require('axios');
const { uuid } = require('uuidv4');
class PaymentHandler {


    /**
     *
     *
     * @param paymentData
     *
     * @param {Number} paymentData.amount transaction Amount
     * @param {String} paymentData.currency Currency
     * @param {String} paymentData.description description
     * @param {String } paymentData.reference_id
     * @returns {Promise<any>}
     */

   async initializePayment(paymentData){

       try {

           const response = await axios.post(process.env.SAFARICONNECT_URL, {
               schemaVersion     : "1.0",
               requestId         : uuid(),
               timestamp         : new Date().valueOf(),
               channelName       : "WEB",
               serviceName       : "HPP_PURCHASE",
               serviceParams: {
                   storeId               : process.env.STORE_ID,
                   hppKey                : process.env.HPP_KEY,
                   merchantUid           : process.env.MERCANT_ID,
                   hppSuccessCallbackUrl : process.env.APP_URL + '/v1/customer/payment/success-callback',
                   hppFailureCallbackUrl : process.env.APP_URL + "/v1/customer/payment/failure-callback",
                   hppRespDataFormat     : "4",
                   paymentMethod         : "CREDIT_CARD",
                   transactionInfo       : {
                       referenceId   : paymentData.reference_id,
                       invoiceId     : paymentData.reference_id,
                       amount        : paymentData.amount,
                       currency      : paymentData.currency,
                       description   : paymentData.description
                   }
               }
           })


           return  response.data

       }catch (e) {

           return  Promise.reject(e)
       }

    }



    async getPaymentDetails(token){

        try {

            const response = await axios.post(process.env.SAFARICONNECT_URL, {
                schemaVersion     : "1.0",
                requestId         : uuid(),
                timestamp         : new Date().valueOf(),
                channelName       : "WEB",
                serviceName       : "HPP_GETRESULTINFO",
                serviceParams: {
                    storeId               : process.env.STORE_ID,
                    hppKey                : process.env.HPP_KEY,
                    merchantUid           : process.env.MERCANT_ID,
                    hppResultToken: token

                }
            })


            return  response.data

        }catch (e) {

            return  Promise.reject(e)
        }

    }
}


module.exports = PaymentHandler
