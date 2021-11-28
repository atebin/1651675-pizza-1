import resources from "./enums/resources";
import {
  AuthApiService,
} from "@/services/api.service";

export const createResource = notifier => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
  };
};