////////////////////////////////////////////////////////////////////////////////
//     COMMON
////////////////////////////////////////////////////////////////////////////////

// common - builder
export const INGREDIENT_COUNTER_LIMIT_MAX = 3;

// common - cart
export const PIZZA_COUNTER_LIMIT_MAX = 10;

// common - notification
export const SEC = 1000;
export const MESSAGE_LIVE_TIME = 15 * SEC;

// normalizeUser
export const USER_ID_FOR_AVATAR = "user5";

////////////////////////////////////////////////////////////////////////////////
//     LOCAL STORAGE
////////////////////////////////////////////////////////////////////////////////

// local storage - root
export const LOCAL_STORAGE_ID_TOKEN_KEY = "_1651675_token";
export const LOCAL_STORAGE_USER_AUTHORIZED = "_1651675_user_authorized";
export const LIST_USER_ADDRESSES = [
  {
    name: "Дом1",
    userId: "",
    street: "Советская",
    building: "125а",
    flat: "14",
    comment: "",
  },
  {
    name: "Работа",
    userId: "",
    street: "Ленина",
    building: "25",
    flat: "1",
    comment: "",
  },
  {
    name: "Дача",
    userId: "",
    street: "Зеленая",
    building: "3",
    flat: "1",
    comment: "",
  },
];

// local storage - builder
export const LOCAL_STORAGE_PIZZA_BUILDER = "_1651675_pizza_builder";
export const LOCAL_STORAGE_PIZZA_BUILDER_NAME = "_1651675_pizza_builder_name";

// local storage - cart
export const LOCAL_STORAGE_PIZZA_LIST = "_1651675_pizza_list";
export const LOCAL_STORAGE_MISC_LIST = "_1651675_misc_list";
export const LOCAL_STORAGE_USER_PHONE = "_1651675_user_phone";
export const LOCAL_STORAGE_USER_ADRESS = "_1651675_user_adress";
export const LOCAL_STORAGE_ORDER_COST_IN_CART = "_1651675_order_cost_in_cart";
