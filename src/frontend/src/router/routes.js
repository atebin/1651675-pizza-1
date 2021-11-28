import { auth, isLoggedIn } from "@/middlewares";

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    meta: {
      layout: "AppLayoutMain",
      routeNameForLogin: "LoginModal",
      routeNameForUnauthorized: null,
      middlewares: [],
    },
    children: [
      {
        path: "login-modal",
        name: "LoginModal",
        component: () => import("../views/Login.vue"),
        meta: {
          layout: "AppLayoutMain",
          routeNameForLogin: "LoginModal",
          routeNameForUnauthorized: null,
          middlewares: [isLoggedIn],
        },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      layout: "AppLayoutMain",
      routeNameForLogin: "Login",
      routeNameForUnauthorized: null,
      middlewares: [],
    },
    children: [
      {
        path: "popup",
        name: "Popup",
        component: () => import("../views/Popup.vue"),
        meta: {
          layout: "AppLayoutMain",
          routeNameForLogin: null,
          routeNameForUnauthorized: null,
          middlewares: [],
        },
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutMain",
      routeNameForLogin: "Login",
      routeNameForUnauthorized: "Index",
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "AppLayoutMainWithSidebar",
      routeNameForLogin: "Login",
      routeNameForUnauthorized: "Index",
      middlewares: [auth],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: "AppLayoutDefault",
      routeNameForLogin: null,
      routeNameForUnauthorized: null,
      middlewares: [isLoggedIn],
    },
  },
];

export default routes;
