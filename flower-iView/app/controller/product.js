const Controller = require("egg").Controller;
class ProductController extends Controller {
  //获取商品列表
  async find() {
    const ctx = this.ctx;
    //获取 service 返回值
    const productData = await ctx.service.product.find();
    ctx.body = {
      productData
    };
  }
  //获取热销推荐商品
  async hot() {
    const ctx = this.ctx;
    const hotProduct = await ctx.service.product.hot();
    ctx.body = {
      hotProduct
    };
  }
  //按分类获取商品列表
  async category() {
    const ctx = this.ctx;
    const category_id = ctx.params.id;
    const productData = await ctx.service.product.category(category_id);
    ctx.body = {
      productData
    };
  }
  //按id查找商品
  async findProductId() {
    const ctx = this.ctx;
    const product_id = ctx.params.id;
    const productData = await ctx.service.product.findProductId(product_id);
    ctx.body = {
      productData
    };
  }
  //获取商品详情
  async detile() {
    const ctx = this.ctx;
    const product_id = ctx.params.id;
    const productDetile = await ctx.service.product.detile(product_id);
    ctx.body = {
      productDetile
    };
  }
  //添加商品
  async create() {
    const ctx = this.ctx;
    const creatProduct = await ctx.service.product.create();
    if (creatProduct.affectedRows === 0) {
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
  //修改商品信息
  async update() {
    const ctx = this.ctx;
    const updatePruduct = await ctx.service.product.update();
    if (updatePruduct.affectedRows === 0) {
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
  //客户端改变商品库存和销量
  async stock() {
    const ctx = this.ctx;
    const updateProduct = await ctx.service.product.stock();
    if (updateProduct.affectedRows === 0) {
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
  //删除商品
  async delete() {
    const ctx = this.ctx;
    const product_id = ctx.params.id;
    const deleteProduct = await ctx.service.product.delete(product_id);
    if (deleteProduct.affectedRows === 0) {
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
}
module.exports = ProductController;
