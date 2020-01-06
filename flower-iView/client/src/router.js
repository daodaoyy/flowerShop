import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("@src/pages/Login"); //登录
const Secret = () => import("@src/pages/Secret"); //登录
const Home = () => import("@src/pages/Home"); //首页
const User = () => import("@src/pages/user/User"); //会员管理
const Product = () => import("@src/pages/product/Product"); //商品管理
const Order = () => import("@src/pages/order/Order"); //订单管理
const Address = () => import("@src/pages/address/Address"); //地址管理
const NewProduct = () => import("@src/pages/product/NewProduct");

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "/userlist",
        name: "user",
        component: User
      },
      {
        path: "/productlist",
        name: "product",
        component: Product
      },
      {
        path: "/new/product",
        name: "newroduct",
        component: NewProduct
      },
      {
        path: "/orderlist",
        name: "order",
        component: Order
      },
      {
        path: "/addresslist",
        name: "address",
        component: Address
      }
    ]
  },
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/secret",
    name: "Secret",
    component: Secret
  }
];

const router = new VueRouter({
  base: "/",
  mode: "history",
  routes
});

export default router;
