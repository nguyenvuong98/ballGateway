'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const usConfig = new Schema({
    us_id: Number,
    name: String,
    title: String,
    note: String,
    config: Object,
    members: Array,
    delFlag: Number
}, {
    collection: 'us_config'
});

module.exports = mongoose.model('usConfig', usConfig);