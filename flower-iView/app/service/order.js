const Service = require("egg").Service;

class OrderService extends Service {
  //获取订单列表
  async find() {
    const orderData = await this.app.mysql.select("order", {
      where: {
        isdelete: false
      }
    });
    return orderData;
  }
  //客户端获取用户全部订单
  async all(id) {
    const allOrder = await this.app.mysql.select("order", {
      where: {
        isdelete: false,
        user_id: id
      }
    });
    return allOrder;
  }
  //客户端获取用户分类订单列表
  async select(id, status) {
    if (status == -1) {
      const classOrder = await this.app.mysql.select("order", {
        where: {
          isdelete: false,
          user_id: id
        }
      });
      return classOrder;
    } else {
      const classOrder = await this.app.mysql.select("order", {
        where: {
          isdelete: false,
          user_id: id,
          order_status: status
        }
      });
      return classOrder;
    }
  }
  //修改订单状态
  async update() {
    let query = this.ctx.request.body;
    const row = {
      order_status: query.order_status,
      order_redmin: query.order_redmin
    };
    const options = {
      where: {
        order_id: query.order_id
      }
    };
    const updateOrder = await this.app.mysql.update("order", row, options);
    return updateOrder;
  }
  //客户端提醒发货
  async redmin() {
    let query = this.ctx.request.body;
    const row = {
      order_redmin: query.order_redmin
    };
    const options = {
      where: {
        order_id: query.order_id
      }
    };
    const redminOrder = await this.app.mysql.update("order", row, options);
    return redminOrder;
  }
  //客户端取消订单、删除订单
  async delete(id) {
    const options = {
      where: {
        order_id: id
      }
    };
    const row = {
      isdelete: true
    };
    const deleteOrder = await this.app.mysql.update("order", row, options);
    return deleteOrder;
  }
  //按订单状态查找订单
  async findOrderStatus(id) {
    const orderData = await this.app.mysql.select("order", {
      where: {
        isdelete: false,
        order_status: id
      }
    });
    return orderData;
  }
  //按订单Id查找订单
  async findOrderId(id) {
    const orderData = await this.app.mysql.select("order", {
      where: {
        isdelete: false,
        order_id: id
      }
    });
    return orderData;
  }
  //添加订单
  async create() {
    let query = this.ctx.request.body;
    let row = {
      order_id: query.order_id,
      order_time: query.order_time,
      order_price: query.order_price,
      order_words: query.order_words,
      order_status: 0,
      product_number: query.product_number,
      buyer_name: query.buyer_name,
      buyer_phone: query.buyer_phone,
      user_id: query.user_id,
      points_number: query.points_number,
      product_id: query.product_id,
      product_img: query.product_img,
      address_id: query.address_id,
      product_name: query.product_name
    };
    const creatOrder = await this.app.mysql.insert("order", row);
    return creatOrder;
  }
}

module.exports = OrderService;
