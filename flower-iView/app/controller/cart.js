const Controller = require("egg").Controller;
class ProductController extends Controller {
  //客户端获取购物车列表
  async all() {
    const ctx = this.ctx;
    const user_id = ctx.params.id;
    const cart = await ctx.service.cart.all(user_id);
    const cartList = cart.reverse();
    ctx.body = {
      cartList
    };
  }
  //客户端获取某个购物车
  async onecart() {
    const ctx = this.ctx;
    const user_id = ctx.query.user_id;
    const product_id = ctx.query.product_id;
    const cartData = await ctx.service.cart.onecart(user_id, product_id);
    if (cartData == 0) {
      ctx.body = {
        code: 0,
        cart_id: 0,
        product_number: 0,
        msg: "未添加"
      };
    } else {
      ctx.body = {
        code: 1,
        cart_id: cartData[0].cart_id,
        product_number: cartData[0].product_number,
        msg: "已添加"
      };
    }
  }
  //客户端修改购物车商品个数
  async update() {
    const ctx = this.ctx;
    const updateCart = await ctx.service.cart.update();
    if (updateCart.affectedRows === 0) {
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
  //客户端删除购物车列表商品
  async delete() {
    const ctx = this.ctx;
    const cart_id = ctx.params.id;
    const deleteCart = await ctx.service.cart.delete(cart_id);
    if (deleteCart.affectedRows === 0) {
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
  //客户端添加购物车
  async create() {
    const ctx = this.ctx;
    const creatCart = await ctx.service.cart.create();
    if (creatCart.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "已添加~"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "添加成功"
      };
    }
  }
}
module.exports = ProductController;
