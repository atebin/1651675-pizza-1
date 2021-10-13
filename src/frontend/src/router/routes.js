const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    meta: {
      layout: "AppLayoutMain",
      routeNameForLogin: "LoginModal",
      routeNameForUnauthorized: null,
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
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutMain",
      routeNameForLogin: "Login",
      routeNameForUnauthorized: "Index",
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
    },
  },
];

export default routes;
