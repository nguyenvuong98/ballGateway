const models = require('../models');
class UsMemberRepository {
    static async find(query = {}, projection = {} ) {
        return await models.usMember.find(query, projection);
    }

    static async findOne(query = {}, projection = {} ) {
        return await models.usMember.findOne(query, projection);
    }
}

module.exports = UsMemberRepository;