const Controller = require("egg").Controller;

class UserController extends Controller {
  //获取用户列表
  async find() {
    const ctx = this.ctx;
    const userData = await ctx.service.user.find();
    ctx.body = {
      userData
    };
  }
  //客户端登录信息验证获取用户信息
  async all() {
    const ctx = this.ctx;
    const user_phone = ctx.query.user_phone;
    const user_password = ctx.query.user_password;
    const userData = await ctx.service.user.all(user_phone, user_password);
    ctx.body = {
      userData
    };
  }
  //按账号查询用户
  async findUserPhone() {
    const ctx = this.ctx;
    const user_phone = ctx.params.phone;
    const userData = await ctx.service.user.findUserPhone(user_phone);
    ctx.body = {
      userData
    };
  }
  //按id查找用户信息
  async findUserId() {
    const ctx = this.ctx;
    const user_id = ctx.params.id;
    const userData = await ctx.service.user.findUserId(user_id);
    ctx.body = {
      userData
    };
  }
  //删除用户
  async delete() {
    const ctx = this.ctx;
    const user_id = ctx.params.id;
    const deleteUser = await ctx.service.user.delete(user_id);
    if (deleteUser.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "删除失败!"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "删除成功!"
      };
    }
  }
  //客户端修改用户名
  async updateName() {
    const ctx = this.ctx;
    const updateUser = await ctx.service.user.updateName();
    if (updateUser.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "修改失败!"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "修改成功!"
      };
    }
  }
  //客户端修改性别
  async updateSex() {
    const ctx = this.ctx;
    const updateUser = await ctx.service.user.updateSex();
    if (updateUser.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "修改失败!"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "修改成功!"
      };
    }
  }
  //修改密码
  async updatePass() {
    const ctx = this.ctx;
    const updateUser = await ctx.service.user.updatePass();
    if (updateUser.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "修改失败!"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "修改成功!"
      };
    }
  }
  //禁用和启用用户
  async updateStatus() {
    const ctx = this.ctx;
    const updateUser = await ctx.service.user.updateStatus();
    if (updateUser.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "修改失败!"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "修改成功!"
      };
    }
  }
  //修改用户积分
  async points() {
    const ctx = this.ctx;
    const updateUser = await ctx.service.user.points();
    if (updateUser.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "修改失败!"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "修改成功!"
      };
    }
  }
  //客户设置修改密保
  async secret() {
    const ctx = this.ctx;
    const updateUser = await ctx.service.user.secret();
    if (updateUser.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "修改失败!"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "修改成功!"
      };
    }
  }
  //客户忘记密码
  async forget() {
    const ctx = this.ctx;
    const updateUser = await ctx.service.user.forget();
    if (updateUser.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "修改失败!"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "修改成功!"
      };
    }
  }
  //添加用户
  async create() {
    const ctx = this.ctx;
    const creatUser = await ctx.service.user.create();
    if (creatUser.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "注册失败！"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "注册成功"
      };
    }
  }
}
module.exports = UserController;
