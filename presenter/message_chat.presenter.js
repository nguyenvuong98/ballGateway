const MessageChatRepository  = require('../repository/message_chat.repository');

class MessageChatPresenter {
    static async getMessage(query) {
        let p = parseInt(query ? query.p : 0) || 0;
        let limit = parseInt(query ? query.limit : 10) || 10;
        let skip = (p + 1) * limit - 1;
        let count = await MessageChatRepository.count();
        skip = count - 5 > 0 ? count - 5 : 0;
        limit = 10;
        let messages = await MessageChatRepository.findPaging({del_flag: 0}, {}, skip, limit);
        return messages
    }

    static async create(data) {
        if (!data || !data.username || !data.message) return;

        let obj = {
            user_name: data.username,
            content: data.message
        }

        let process = await MessageChatRepository.create(obj);

        return process;
    }
}

module.exports = MessageChatPresenter;