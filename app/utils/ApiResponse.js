

class ApiResponse {

    constructor(status, data, message) {
        this.status = status;
        this.message = message;
        this.data = data;
    }


    static make(status, data, message = "Action Successful") {
        return new ApiResponse(status, data, message);
    }

    static falseMessage(message) {
        return ApiResponse.make(false, null, message);
    }

    static trueMessage(message) {
        return ApiResponse.make(true, null, message);
    }

    static trueData(data, message = "Action Successful") {
        return ApiResponse.make(true, data, message);
    }

}

module.exports = ApiResponse;

