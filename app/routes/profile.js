let router = require('express').Router();

let profileController = require('../controllers/profileController');

router.put('/update/:id', profileController.updateCustomer);

module.exports = router;