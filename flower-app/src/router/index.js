import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/home/Home";
import ProductList from "@/pages/Product/ProductList";
import ProductDetile from "@/pages/Product/ProductDetile";
import PlaceOrder from "@/pages/order/PlaceOrder";
import OrderList from "@/pages/order/OrderList";
import Personal from "@/pages/personal/Personal";
import Password from "@/pages/personal/Password";
import PersonalName from "@/pages/personal/PersonalName";
import PersonalMsg from "@/pages/personal/PersonalMsg";
import Introduct from "@/pages/personal/Introduct";
import NewAddress from "@/pages/address/NewAddress";
import AddressList from "@/pages/address/AddressList";
import CartList from "@/pages/cart/CartList";
import Secret from "@/pages/personal/Secret";
import Forget from "@/pages/Forget";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Register",
    name: "register",
    component: Register
  },
  {
    path: "/Secret",
    name: "secret",
    component: Secret
  },
  {
    path: "/Forget",
    name: "forget",
    component: Forget
  },
  {
    path: "/Home",
    name: "home",
    component: Home
  },
  {
    path: "/ProductList",
    name: "productlist",
    component: ProductList
  },
  {
    path: "/ProductDetile",
    name: "productdetile",
    component: ProductDetile
  },
  {
    path: "/PlaceOrder",
    name: "placeorder",
    component: PlaceOrder
  },
  {
    path: "/OrderList",
    name: "orderlist",
    component: OrderList
  },
  {
    path: "/Personal",
    name: "personal",
    component: Personal
  },
  {
    path: "/Password",
    name: "password",
    component: Password
  },
  {
    path: "/PersonalName",
    name: "personalname",
    component: PersonalName
  },
  {
    path: "/PersonalMsg",
    name: "personalmsg",
    component: PersonalMsg
  },
  {
    path: "/Introduct",
    name: "introduct",
    component: Introduct
  },
  {
    path: "/NewAddress",
    name: "newAddress",
    component: NewAddress
  },
  {
    path: "/AddressList",
    name: "addresslist",
    component: AddressList
  },
  {
    path: "/CartList",
    name: "cartlist",
    component: CartList
  },
  {
    path: "/",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  base: "/",
  mode: "history",
  routes
});

export default router;
