const Service = require("egg").Service;
// const jwt = require("jsonwebtoken"); //引入jsonwebtoken

class AdminService extends Service {
  async admin() {
    //获取管理员登录页输入的账户信息
    let query = this.ctx.request.body;
    let phone = query.admin_phone;
    let password = query.admin_password;
    //获取数据库 admin 的信息、判断与输入的信息是否一致
    const errorData = 0;
    const adminData = await this.app.mysql.get("admin");
    if (
      phone === adminData.admin_phone &&
      password === adminData.admin_password
    ) {
      return adminData;
    } else {
      return errorData;
    }
  }
  async changePass() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        admin_id: query.admin_id
      }
    };
    const row = {
      admin_password: query.new_password
    };
    const updateAdmin = await this.app.mysql.update("admin", row, options);
    return updateAdmin;
  }
  async resetPass() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        admin_phone: query.admin_phone,
        admin_secret: query.admin_secret
      }
    };
    const row = {
      admin_password: query.admin_password
    };
    const updateAdmin = await this.app.mysql.update("admin", row, options);
    return updateAdmin;
  }
}

module.exports = AdminService;
