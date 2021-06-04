const UserRepository = require('../repository/user.repository');

class UserPresenter {
    static async register(body) {
        let username = body.username;
        let password = body.password;

        if (!username || !password) throw new Error('Information missing ');

        let user = await UserRepository.findOne({name: username , del_flag: 0});

        if (user) throw new Error('User is exists');

        let obj = {
            name: username,
            password: password,
        }

        let process = await UserRepository.create(obj);

        return process;
    }

    static async login(body) {
        let username = body.username;
        let password = body.password;

        if (!username || !password) throw new Error('Information missing ');

        let user = await UserRepository.findOne({name: username , password: password, del_flag: 0});

        if (!user) throw new Error('User not found');

        return;
    }
}

module.exports = UserPresenter