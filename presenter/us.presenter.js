const UsConfigRepository = require('../repository/usConfig.repository');
const _ = require('lodash');
class UsPresenter {
    static async getUsInfor(us_id) {
        if (!us_id) {
            throw new Error('Us not found');
        }

        let usConfig = await UsConfigRepository.findOne({us_id: us_id});
        delete usConfig.secret_key;

        if (usConfig.members && usConfig.members.length) {
            usConfig.members = _.orderBy(usConfig.members, ['stt'], ['asc'])
        }

        if (!usConfig) {
            throw new Error('Us not found');
        }

        return usConfig;
    }
    static async insertUs(body) {
        let name = body.name;
        let note = body.note;
        let title = body.title;
        let secret_key = body.secret_key;

        if (!name || !secret_key) {
            throw new Error('Missing infor');
        }

        let count = await UsConfigRepository.count();

        let create = await UsConfigRepository.create({us_id: count + 1, name, note, title});

        return create;
    }

    static async updateUs(body) {
        let us_id = body.us_id;
        let note = body.note;
        let title = body.title;
        let members = body.members;
        let secret_key = body.secret_key;

        members = typeof members == "string" ? JSON.parse(members) : members;
        if (!us_id) {
            throw new Error('error us not found');
        }
        
        let usConfig = await UsConfigRepository.findOne({us_id});

        if (!usConfig) {
            throw new Error('Us not found');
        }

        if (!secret_key || secret_key !== usConfig.secret_key) {
            throw new Error('Permission denied');
        }
        
        usConfig.note = note;
        usConfig.title = title;
        usConfig.members = members;
        await usConfig.save();
        
        return;
    }
}
module.exports = UsPresenter;