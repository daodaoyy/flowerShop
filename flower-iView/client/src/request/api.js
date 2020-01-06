//接口管理
import { get, post, del, put } from "./http";

export const apiAdmin = params => post("/admin", params); //管理员登录信息验证
export const apiAdminChangePass = params => put("/admin/password", params); //管理员修改密码
export const apiResetPass = params => put("/admin/secret", params); //管理员重置密码
// export const apiAdminInfo = () => get('/adminInfo'); //获取管理员信息

export const apiUserList = () => get("/users"); //后台管理查看用户列表
export const apiFindUserPhone = params =>
  get("/user/phone/" + params.user_phone); //按账户查询用户
export const apiFindUserId = params => get("/user/" + params.user_id); //按id查询用户
export const apiDeleteUser = params => del("/user/" + params.user_id); //删除用户
export const apiUpdateUser = params => put("/user", params); //启用和禁用用户

export const apiOrderList = () => get("/orders"); //获取订单列表
export const apiUpdateOrder = params => put("/order", params); //修改订单状态
export const apiDeleteOrder = params => del("/order/" + params.id); //删除订单
export const apiCreateOrder = params => post("/order", params); //添加订单
export const apiOrderStatus = params =>
  get("/order/status/" + params.order_status); //按状态查找订单
export const apiIdOrder = params => get("/order/" + params.order_id); //按状态查找订单

export const apiAddressList = () => get("/address"); //获取地址列表
export const apiDeleteAddress = params => del("/address/:id", params); //删除地址
export const apiCreateAddress = params => post("/address", params); //添加地址
export const apiUpdateAddress = params => put("/address", params); //修改地址
export const apiAddressUser = params =>
  get("/address/userId/" + params.user_id); //按会员Id查找地址
export const apiAddressId = params => get("/address/" + params.address_id); //按地址id查找地址

export const apiProductList = () => get("/products"); //后台管理查看商品列表
export const apiDeleteProduct = params => del("/product/" + params.product_id); //删除下架商品
export const apiUpdateProduct = params => put("/product", params); //添加商品
export const apiCreateProduct = params => post("/product", params); //添加商品
export const apiCateProduct = params =>
  get("/product/cate/" + params.category_id); //按分类查找商品
export const apiIdProduct = params => get("/product/" + params.product_id);
