//接口管理
import { get, post, del, put } from "./http";

export const apiUpdatePoints = params => put("/apis/user/points", params); //客户端改变用户积分
export const apiGetUserData = params => get("/apis/users/" + params.user_id); //客户获取自己信息
export const apiGetUserInfo = params => get("/apis/user/", params); //客户端登录验证信息
export const apiUpdateName = params => put("/apis/user/name", params); //客户端修改用户名
export const apiChangeSex = params => put("/apis/user/sex", params); //客户端修改用户性别
export const apiChangePass = params => put("/apis/user/password", params); //客户端修改密码
export const apiCreateUser = params => post("/apis/user", params); //客户端注册新用户
// export const apiGetUserPhone = params => get("/apis/user/" + params.user_phone); //按账户查找用户
export const apiFindUserPhone = params =>
  get("/apis/user/phone/" + params.user_phone); //按账户查询用户
export const apiCreateSecret = params => put("/apis/user/secret", params); //客户端设置修改密保
export const apiForgetPass = params => put("/apis/user/forgetful", params); //客户端忘记密码

export const apiHotProduct = () => get("/apis/products/hot"); //客户端首页推荐商品列表
export const apiClassPruduct = params =>
  get("/apis/products/" + params.category_id); //客户端商品分类列表
export const apiProductDetile = params =>
  get("/apis/product/detile/" + params.product_id); //客户端获取对应的商品详情页
export const apiUpdateProduct = params => put("/apis/product/stock", params); //客户端改变商品库存和销量

export const apiAllOrder = params => get("/apis/orders/" + params.user_id); //客户端获取用户全部订单
export const apiClassOrder = params => get("/apis/oneorder", params); //客户端获取分类订单列表
export const apiDeleteOrder = params => del("/apis/order/" + params.order_id); //客户端删除订单、取消订单
export const apiReceiveOrder = params => put("/apis/order", params); //客户端订单确认收货、去付款
export const apiNewOrder = params => post("/apis/order", params); //客户端下单、增加订单
export const apiOrderRedmin = params => put("/apis/order/reminder", params); //客户端提醒发货

export const apiAllAddress = params =>
  get("/apis/address/all/" + params.user_id); //客户端获取用户全部地址列表
export const apiDeleteAddress = params =>
  del("/apis/address/" + params.address_id); //客户端用户删除地址
export const apiDefaultAddress = params => get("/apis/oneaddress", params); //获取默认地址信息
export const apiNewAddress = params => post("/apis/address", params); //客户端添加地址
export const apiChangeAddress = params => put("/apis/address", params); //客户单修改默认地址

export const apiCartList = params => get("/apis/carts/" + params.user_id); //客户端获取购物车列表
export const apiGetOneCart = params => get("/apis/cart", params); //客户端获取某个购物车
export const apiDeleteCart = params => del("/apis/cart/" + params.cart_id); //客户端删除购物车
export const apiChangeCart = params => put("/apis/cart", params); //改变购物车商品个数
export const apiCreateCart = params => post("/apis/cart", params); //客户端添加购物车
