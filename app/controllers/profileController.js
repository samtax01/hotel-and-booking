
exports.updateCustomer = function(request, response) {
    response.send({
        status: "success",
        data: {
            first_name : "Kathleen",
            last_name  : "MacKellar",
            email      : "kmackellar0@bloglovin.com",
            role    : "1f139eb5-b14e-4126-8c3f-043936182327",
        }
    })
}
