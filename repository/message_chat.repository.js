const models = require('../models');

class MessageChatRepository {
    static async findPaging(query = {}, projection = {}, skip = 0, limit =  20) {
        return await models.message_chat.find(query, projection).sort({created_at: -1}).skip(0).limit(limit);
    }
}

module.exports = MessageChatRepository;