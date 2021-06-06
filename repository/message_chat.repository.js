const models = require('../models');

class MessageChatRepository {
    static async findPaging(query = {}, projection = {}, skip = 0, limit =  20) {
        return await models.message_chat.find(query, projection).skip(skip).limit(limit);
    }

    static async create(obj) {
        if (!obj) return;

        return await models.message_chat.create(obj);
    }

    static async count(query = {}) {
        return await models.message_chat.countDocuments(query);
    }
}

module.exports = MessageChatRepository;