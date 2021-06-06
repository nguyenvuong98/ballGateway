const models = require('../models');

class UserRepository {
    static async create(obj = {}) {
        if (!obj) return;

        return await models.user.create(obj);
    }

    static async findOne(query = {}, projection = {}) {
        return await models.user.findOne(query, projection);
    }

    static async find(query = {}, projection = {}) {
        return await models.user.find(query, projection);
    }
}

module.exports = UserRepository;