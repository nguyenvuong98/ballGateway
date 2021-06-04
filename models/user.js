'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const user = new Schema({
    name: String,
    password: String,
    created_at: {
        type: Number,
        default: Math.floor(new Date() / 1000)
    },
    updated_at: {
        type: Number,
        default: Math.floor(new Date() / 1000)
    },
    is_pin: Boolean,
    is_online: {
        type: Boolean,
        default: false
    },
    del_flag: {
        type: Number,
        default: 0
    }
}, {
    collection: 'user'
});

module.exports = mongoose.model('user', user);