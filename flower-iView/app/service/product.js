const Service = require("egg").Service;

class ProductService extends Service {
  //获取商品列表
  async find() {
    const productData = await this.app.mysql.select("products", {
      where: {
        isdelete: false
      }
    });
    return productData;
  }
  //获取热销推荐商品
  async hot() {
    const hotProduct = await this.app.mysql.select("products", {
      where: {
        isdelete: false,
        hot_product: 1
      }
    });
    return hotProduct;
  }
  //按分类获取商品
  async category(id) {
    const productData = await this.app.mysql.select("products", {
      where: {
        isdelete: false,
        category_id: id
      }
    });
    return productData;
  }
  //按Id查找用户信息
  async findProductId(id) {
    const productData = await this.app.mysql.select("products", {
      where: {
        isdelete: false,
        product_id: id
      }
    });
    return productData;
  }
  //获取商品详情
  async detile(id) {
    const productDetile = await this.app.mysql.get("products", {
      product_id: id
    });
    return productDetile;
  }
  //添加商品
  async create() {
    let query = this.ctx.request.body;
    let row = {
      product_name: query.product_name,
      product_datas: query.product_datas,
      product_language: query.product_language,
      product_desc: query.product_desc,
      product_price: query.product_price,
      product_sell: query.product_sell,
      product_stock: query.product_stock,
      category_id: query.category_id,
      product_img: query.product_img,
      isdelete: query.isdelete,
      hot_product: query.hot_product
    };
    const creatUser = await this.app.mysql.insert("products", row);
    return creatUser;
  }
  //修改商品信息
  async update() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        product_id: query.product_id
      }
    };
    const row = {
      product_id: query.product_id,
      product_name: query.product_name,
      product_datas: query.product_datas,
      product_language: query.product_language,
      product_desc: query.product_desc,
      product_price: query.product_price,
      product_sell: query.product_sell,
      product_stock: query.product_stock,
      category_id: query.category_id,
      product_img: query.product_img,
      isdelete: query.isdelete,
      hot_product: query.hot_product
    };
    const updateProduct = await this.app.mysql.update("products", row, options);
    return updateProduct;
  }
  //客户端改变商品库存和销量
  async stock() {
    let query = this.ctx.request.body;
    const options = {
      where: {
        product_id: query.product_id
      }
    };
    const row = {
      product_sell: query.product_sell,
      product_stock: query.product_stock
    };
    const updateProduct = await this.app.mysql.update("products", row, options);
    return updateProduct;
  }
  //下架删除商品
  async delete(id) {
    const options = {
      where: {
        product_id: id
      }
    };
    const row = {
      isdelete: true
    };
    const deleteProduct = await this.app.mysql.update("products", row, options);
    return deleteProduct;
  }
}

module.exports = ProductService;
