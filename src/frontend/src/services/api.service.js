import JwtService from "@/services/jwt.service.js";
import axios from "@/plugins/axios.js";
//import { normalizeUser } from "@/common/normalizeUser.js";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  // UserController
  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  //async getMe() {
  async getMe() {
    /*
    const { data } = await axios.get("whoAmI");
    return data;
    */
    const { data } = await axios.get("whoAmI");

    return new Promise((resolve) => {
      resolve(data);
    });
  }

  // AddressController
  async addressAdd(params) {
    const { data } = await axios.post("addresses", params);
    return data;
  }
  async getAddressesList() {
    const { data } = await axios.get("addresses");
    return data;
  }
}
