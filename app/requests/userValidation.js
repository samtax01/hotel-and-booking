'use strict';

const Joi = require('joi');

const userSchemas = {
    createUser: Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).max(15).required(),
        last_name: Joi.string().alphanum().min(3).max(15).required().required(),
        role: Joi.string().required(),
        account_type: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }),

    listUsers: Joi.object().keys({
        page: Joi.string().allow('').optional(),
        pageSize: Joi.string().allow('').optional()
    }),

    getUser: Joi.object().keys({
        id: Joi.string().required()
    }),

    updateUser: Joi.object().keys({
        id: Joi.string().required()
    }),

    deleteUser: Joi.object().keys({
        id: Joi.string().required()
    }),
};

module.exports = userSchemas;
