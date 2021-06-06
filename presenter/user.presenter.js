const UserRepository = require('../repository/user.repository');

class UserPresenter {
    static async register(body) {
        let username = body.username;
        let password = body.password;

        if (!username || !password) throw new Error('Thiếu thông tin ');

        let user = await UserRepository.findOne({name: username , del_flag: 0});

        if (user) throw new Error('Người dùng đã tồn tại');

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

        if (!username || !password) throw new Error('Thiếu thông tin ');

        let user = await UserRepository.findOne({name: username , password: password, del_flag: 0});

        if (!user) throw new Error('Sai tên đăng nhập hoặc mật khẩu');

        //if (user.is_online) throw new Error('Tài khoản đang đăng nhập ở nơi khác');

        return;
    }

    static async get() {
        let user = await UserRepository.find({del_flag: 0});

        return user;
    }
}

module.exports = UserPresenter