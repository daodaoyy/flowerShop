const Service = require("egg").Service;

class UserService extends Service {
  //获取数据库用户列表
  async find() {
    const userData = await this.app.mysql.select("user", {
      where: {
        isdelete: false
      }
    });
    return userData;
  }
  //客户端登录信息验证获取用户信息
  async all(phone, password) {
    const userData = await this.app.mysql.select("user", {
      where: {
        isdelete: false,
        user_phone: phone,
        user_password: password
      }
    });
    return userData;
  }
  //按账号查找用户列表
  async findUserPhone(phone) {
    const userData = await this.app.mysql.select("user", {
      where: {
        isdelete: false,
        user_phone: phone
      }
    });
    return userData;
  }
  //按Id查找用户信息
  async findUserId(id) {
    const userData = await this.app.mysql.select("user", {
      where: {
        isdelete: false,
        user_id: id
      }
    });
    return userData;
  }
  //删除用户
  async delete(id) {
    const options = {
      where: {
        user_id: id
      }
    };
    const row = {
      isdelete: true
    };
    const deleteUser = await this.app.mysql.update("user", row, options);
    return deleteUser;
  }
  //客户端修改用户名
  async updateName() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        user_id: query.user_id
      }
    };
    const row = {
      user_name: query.user_name
    };
    const updateUser = await this.app.mysql.update("user", row, options);
    return updateUser;
  }
  //客户端修改性别
  async updateSex() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        user_id: query.user_id
      }
    };
    const row = {
      user_sex: query.user_sex
    };
    const updateUser = await this.app.mysql.update("user", row, options);
    return updateUser;
  }
  //修改密码
  async updatePass() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        user_id: query.user_id
      }
    };
    const row = {
      user_password: query.user_password
    };
    const updateUser = await this.app.mysql.update("user", row, options);
    return updateUser;
  }
  //禁用和启用用户
  async updateStatus() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        user_id: query.user_id
      }
    };
    const row = {
      user_status: query.user_status
    };
    const updateUser = await this.app.mysql.update("user", row, options);
    return updateUser;
  }
  //修改用户积分
  async points() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        user_id: query.user_id
      }
    };
    const row = {
      user_points: query.user_points,
      user_level: query.user_level
    };
    const updateUser = await this.app.mysql.update("user", row, options);
    return updateUser;
  }
  //用户设置密保
  async secret() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        user_id: query.user_id
      }
    };
    const row = {
      secret1: query.secret1,
      secret2: query.secret2
    };
    const updateUser = await this.app.mysql.update("user", row, options);
    return updateUser;
  }
  //用户忘记密码
  async forget() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        user_phone: query.user_phone,
        secret1: query.secret1,
        secret2: query.secret2
      }
    };
    const row = {
      user_password: query.user_password
    };
    const updateUser = await this.app.mysql.update("user", row, options);
    return updateUser;
  }
  //添加用户
  async create() {
    let query = this.ctx.request.body;
    let row = {
      user_phone: query.user_phone,
      user_password: query.user_password
    };
    const creatUser = await this.app.mysql.insert("user", row);
    return creatUser;
  }
}

module.exports = UserService;
