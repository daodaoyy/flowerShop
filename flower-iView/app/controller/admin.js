const Controller = require("egg").Controller;
// const jwt = require("jsonwebtoken"); //引入jsonwebtoken

class AdminController extends Controller {
  async admin() {
    const ctx = this.ctx;
    //获取 service 返回值
    const adminData = await ctx.service.admin.admin();
    //判断返回值返回给前端登录页进行判断
    if (adminData == 0) {
      ctx.body = {
        code: 0,
        msg: "登陆失败"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "登陆成功"
      };
    }
  }
  async changePass() {
    const ctx = this.ctx;
    const updateAdmin = await ctx.service.admin.changePass();
    if (updateAdmin.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "修改失败"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "修改成功"
      };
    }
  }
  async resetPass() {
    const ctx = this.ctx;
    const updateAdmin = await ctx.service.admin.resetPass();
    if (updateAdmin.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "重置失败"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "重置成功"
      };
    }
  }
}
module.exports = AdminController;
