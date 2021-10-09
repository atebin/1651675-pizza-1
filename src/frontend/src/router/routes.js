const routes = [
  {
    path: "/",
    name: "Index",
    meta: {
      layout: "AppLayoutHeader",
      component: "Index",
      routeNameForLogin: "LoginModal",
      routeNameForUnauthorized: null,
    },
    children: [
      {
        path: "login-modal",
        name: "LoginModal",
        meta: {
          layout: "AppLayoutHeader",
          component_children: "Login",
          routeNameForLogin: "LoginModal",
          routeNameForUnauthorized: "Index",
        },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    meta: {
      layout: "AppLayoutHeader",
      component: "Cart",
      routeNameForLogin: "Login",
      routeNameForUnauthorized: null,
    },
  },
  {
    path: "/orders",
    name: "Orders",
    meta: {
      layout: "AppLayoutHeader",
      component: "Orders",
      routeNameForLogin: "Login",
      routeNameForUnauthorized: "Index",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      layout: "AppLayoutHeader",
      component: "Profile",
      routeNameForLogin: "Login",
      routeNameForUnauthorized: "Index",
    },
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "AppLayoutHeaderBlank",
      component: "Login",
      routeNameForLogin: null,
      routeNameForUnauthorized: null,
    },
  },
];

export default routes;
