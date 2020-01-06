module.exports = app => {
  const { router, controller } = app;
  //管理后台路由接口
  router.post("/admin", controller.admin.admin); //管理员验证
  router.put("/admin/password", controller.admin.changePass); //管理员修改密码
  router.put("/admin/secret", controller.admin.resetPass); //管理员重置密码
  // router.get("/adminInfo", controller.admin.find); //获取管理员信息

  router.get("/orders", controller.order.find); //管理员获取订单列表
  router.get("/order/status/:id", controller.order.findOrderStatus); //按状态查找订单
  router.get("/order/:id", controller.order.findOrderId); //按Id查找订单

  router.get("/address", controller.address.find); //管理员获取地址列表
  router.get("/address/userId/:id", controller.address.findAddressUser); //按会员Id查找地址
  router.get("/address/:id", controller.address.findAddressId); //按地址Id查找地址

  router.get("/users", controller.user.find); //获取用户列表
  router.del("/user/:id", controller.user.delete); //删除用户
  router.put("/user/", controller.user.updateStatus); //禁用启用用户
  router.get("/user/phone/:phone", controller.user.findUserPhone); //按账号查找用户
  router.get("/user/:id", controller.user.findUserId); //按账号查找用户

  router.get("/products", controller.product.find); //获取商品列表
  router.del("/product/:id", controller.product.delete); //删除下架商品
  router.post("/product", controller.product.create); //添加商品
  router.put("/product", controller.product.update); //修改商品
  router.get("/product/cate/:id", controller.product.category); //按商品分类查找商品
  router.get("/product/:id", controller.product.findProductId); //按商品Id查找商品

  //客户端路由接口
  router.put("/user/name", controller.user.updateName); //修改用户名
  router.put("/user/sex", controller.user.updateSex); //修改用户性别
  router.put("/user/password", controller.user.updatePass); //修改密码
  router.post("/user", controller.user.create); //注册添加用户
  router.put("/user/points", controller.user.points); //修改用户积分
  router.get("/user", controller.user.all); //客户端登录信息验证
  router.put("/user/secret", controller.user.secret); //修改用户积分
  router.put("/user/forgetful", controller.user.forget); //修改用户积分

  router.post("/order", controller.order.create); //添加订单
  router.get("/orders/:id", controller.order.all); //客户端获取用户全部订单
  router.get("/oneorder", controller.order.select); //客户端获取订单分类列表
  router.delete("/order/:id", controller.order.delete); //客户端删除订单、取消订单
  router.put("/order/reminder", controller.order.redmin); //客户端提醒发货

  router.get("/address/all/:id", controller.address.all); //客户端获取当前用户的所有地址
  router.delete("/address/:id", controller.address.delete); //删除地址
  router.post("/address", controller.address.create); //添加地址
  router.get("/oneaddress", controller.address.getDefault); //客户端获取默认地址
  router.put("/address", controller.address.changeDefault); //客户端修改默认地址

  router.get("/products/hot", controller.product.hot); //客户端获取热销推荐商品
  router.get("/products/:id", controller.product.category); //客户端获取商品分类列表
  router.get("/product/detile/:id", controller.product.detile); //客户端获取对应商品详情页
  router.put("/product/stock", controller.product.stock); //改变商品库存和销量

  router.get("/carts/:id", controller.cart.all); //客户端获取购物车列表
  router.get("/cart", controller.cart.onecart); //客户端获取某个购物车
  router.delete("/cart/:id", controller.cart.delete); //客户端删除购物车商品
  router.put("/cart", controller.cart.update); //客户端修改购物车商品数量

  router.post("/cart", controller.cart.create); //客户端添加购物车

  //管理后台和客户端公用路由接口
  router.put("/order", controller.order.update); //修改订单状态
  router.get("/users/:id", controller.user.findUserId); //按id查询用户/获取当前id用户信息
  router.get("/user/:phone", controller.user.findUserPhone); //按账户查询用户

  router.get("/**", controller.home.index);
};
