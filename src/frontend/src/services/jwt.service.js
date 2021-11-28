import { LOCAL_STORAGE_ID_TOKEN_KEY } from "@/common/constants.js";

export const getToken = () => {
  return window.localStorage.getItem(LOCAL_STORAGE_ID_TOKEN_KEY);
};

export const saveToken = token => {
  window.localStorage.setItem(LOCAL_STORAGE_ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
