'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const message_chat = new Schema({
    user_id: String,
    user_name: String,
    content: String,
    created_at: {
        type: Number,
        default: Math.floor(new Date() / 1000)
    },
    is_pin: Boolean,
    del_flag: {
        type: Number,
        default: 0
    }
}, {
    collection: 'message_chat'
});

module.exports = mongoose.model('message_chat', message_chat);