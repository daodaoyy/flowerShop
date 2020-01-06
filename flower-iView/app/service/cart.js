const Service = require("egg").Service;

class ProductService extends Service {
  //客户端获取购物车列表
  async all(id) {
    const cartList = await this.app.mysql.select("cart", {
      where: {
        isdelete: false,
        user_id: id
      }
    });
    return cartList;
  }
  //客户端获取某个购物车
  async onecart(user_id, product_id) {
    const cartList = await this.app.mysql.select("cart", {
      where: {
        isdelete: false,
        user_id: user_id,
        product_id: product_id
      }
    });
    return cartList;
  }
  //客户端修改购物车商品数量
  async update() {
    let query = this.ctx.request.body;
    const row = {
      product_number: query.product_number
    };
    const options = {
      where: {
        cart_id: query.cart_id
      }
    };
    const updateCart = await this.app.mysql.update("cart", row, options);
    return updateCart;
  }
  //客户端删除购物车列表商品
  async delete(id) {
    const options = {
      where: {
        cart_id: id
      }
    };
    const row = {
      isdelete: true
    };
    const deleteCart = await this.app.mysql.update("cart", row, options);
    return deleteCart;
  }
  //客户端添加购物车
  async create() {
    let query = this.ctx.request.body;
    let row = {
      user_id: query.user_id,
      product_id: query.product_id,
      product_img: query.product_img,
      product_name: query.product_name,
      product_datas: query.product_datas,
      product_number: 1,
      product_price: query.product_price,
      isdelete: false
    };
    const creatOrder = await this.app.mysql.insert("cart", row);
    return creatOrder;
  }
}

module.exports = ProductService;
