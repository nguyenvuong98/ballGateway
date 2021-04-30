'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const usMember = new Schema({
    us_id: Number,
    us_name: String,
    stt: Number,
    ballz: Number,
    score: Number,
    weekScore: Number,
    note: String,
    position: Object,
    delFlag: Number
}, {
    collection: 'us_member'
});

module.exports = mongoose.model('usMember', usMember);