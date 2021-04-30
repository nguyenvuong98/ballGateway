const models = require('../models');
class UsConfigRepository {
    static async findOne(query = {}, projection = {} ) {
        return await models.usConfig.findOne(query, projection);
    }

    static async create(query = {}) {
        return await models.usConfig.create(query);
    }

    static async count(query = {}) {
        return await models.usConfig.countDocuments(query);
    }
}

module.exports = UsConfigRepository;