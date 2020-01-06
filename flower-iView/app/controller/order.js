const Controller = require("egg").Controller;

class OrderController extends Controller {
  //获取订单列表
  async find() {
    const ctx = this.ctx;
    //获取 service 返回值
    const orderData = await ctx.service.order.find();
    ctx.body = {
      orderData
    };
  }
  //客户端获取用户全部订单
  async all() {
    const ctx = this.ctx;
    const user_id = ctx.params.id;
    const data = await ctx.service.order.all(user_id);
    const allOrder = data.reverse();
    ctx.body = {
      allOrder
    };
  }
  //客户端获取分类订单列表
  async select() {
    const ctx = this.ctx;
    const user_id = ctx.query.user_id;
    const order_status = ctx.query.order_status;
    const classOrder = await ctx.service.order.select(user_id, order_status);
    ctx.body = {
      classOrder
    };
  }
  //修改订单状态
  async update() {
    const ctx = this.ctx;
    const updateOrder = await ctx.service.order.update();
    if (updateOrder.affectedRows === 0) {
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
  //客户端提醒发货
  async redmin() {
    const ctx = this.ctx;
    const redminOrder = await ctx.service.order.redmin();
    if (redminOrder.affectedRows === 0) {
      ctx.body = {
        code: 0,
        msg: "提醒失败!"
      };
    } else {
      ctx.body = {
        code: 1,
        msg: "提醒成功!"
      };
    }
  }
  //客户端取消订单、删除订单
  async delete() {
    const ctx = this.ctx;
    const order_id = ctx.params.id;
    const deleteOrder = await ctx.service.order.delete(order_id);
    if (deleteOrder.affectedRows === 0) {
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
  //按订单状态查找
  async findOrderStatus() {
    const ctx = this.ctx;
    const order_status = ctx.params.id;
    const orderData = await ctx.service.order.findOrderStatus(order_status);
    ctx.body = {
      orderData
    };
  }
  //按id查找商品
  async findOrderId() {
    const ctx = this.ctx;
    const order_id = ctx.params.id;
    const orderData = await ctx.service.order.findOrderId(order_id);
    ctx.body = {
      orderData
    };
  }
  //添加订单
  async create() {
    const ctx = this.ctx;
    const creatOrder = await ctx.service.order.create();
    if (creatOrder.affectedRows === 0) {
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
module.exports = OrderController;
