import Index from "../views/Index.vue";
import Cart from "../views/Cart.vue";
import Orders from "../views/Orders.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import LoginInner from "../views/LoginInner.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      layout: "AppLayoutHeader",
      routeNameForLogin: "LoginModal",
      routeNameForUnauthorized: null,
    },
    children: [
      {
        path: "login-modal",
        name: "LoginModal",
        component: LoginInner,
        meta: {
          layout: "AppLayoutHeader",
          routeNameForLogin: "LoginModal",
          routeNameForUnauthorized: "Index",
        },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      layout: "AppLayoutHeader",
      routeNameForLogin: "Login",
      routeNameForUnauthorized: null,
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      layout: "AppLayoutHeader",
      routeNameForLogin: "Login",
      routeNameForUnauthorized: "Index",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppLayoutHeader",
      routeNameForLogin: "Login",
      routeNameForUnauthorized: "Index",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "AppLayoutHeaderBlank",
      routeNameForLogin: null,
      routeNameForUnauthorized: null,
    },
  },
];

export default routes;
