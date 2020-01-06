const Controller = require("egg").Controller;

class AddressController extends Controller {
  //管理员获取所有地址列表
  async find() {
    const ctx = this.ctx;
    //获取 service 返回值
    const addressData = await ctx.service.address.find();
    ctx.body = {
      addressData
    };
  }
  //客户端用户查看所有地址
  async all() {
    const ctx = this.ctx;
    const user_id = ctx.params.id;
    const allAddress = await ctx.service.address.all(user_id);
    ctx.body = {
      allAddress
    };
  }
  //客户端获取默认地址
  async getDefault() {
    const ctx = this.ctx;
    const user_id = ctx.query.user_id;
    const addressData = await ctx.service.address.getDefault(user_id);
    ctx.body = {
      addressData
    };
  }
  //客户端用户删除地址
  async delete() {
    const ctx = this.ctx;
    const address_id = ctx.params.id;
    const deleteAddress = await ctx.service.address.delete(address_id);
    if (deleteAddress.affectedRows === 0) {
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
  //修改默认地址
  async changeDefault() {
    const ctx = this.ctx;
    const updateAddress = await ctx.service.address.changeDefault();
    if (updateAddress.code === 0) {
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
  //按订单状态查找
  async findAddressUser() {
    const ctx = this.ctx;
    const user_id = ctx.params.id;
    const addressData = await ctx.service.address.findAddressUser(user_id);
    ctx.body = {
      addressData
    };
  }
  //按id查找商品
  async findAddressId() {
    const ctx = this.ctx;
    const address_id = ctx.params.id;
    const addressData = await ctx.service.address.findAddressId(address_id);
    ctx.body = {
      addressData
    };
  }
  //添加地址
  async create() {
    const ctx = this.ctx;
    const creatAddress = await ctx.service.address.create();
    if (creatAddress.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "添加失败！"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "添加成功"
      };
    }
  }
}
module.exports = AddressController;
