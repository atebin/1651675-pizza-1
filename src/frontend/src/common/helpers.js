import resources from "./enums/resources";
import { AuthApiService, ReadOnlyApiService } from "@/services/api.service";

export const createResource = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};
