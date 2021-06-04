const MessageChatRepository  = require('../repository/message_chat.repository');

class MessageChatPresenter {
    static async getMessage(query) {
        let p = parseInt(query.p) || 0;
        let limit = parseInt(query.limit) || 20;
        let skip = (p + 1) * limit - 1;

        let messages = await MessageChatRepository.findPaging({del_flag: 0}, {}, skip, limit);
    }
}

module.exports = MessageChatPresenter;