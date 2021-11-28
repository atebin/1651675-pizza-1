import Vue from "vue";
import JWTService from "@/services/jwt.service";
import Notifier from "@/plugins/notifier";
import store from "@/store";
import { createResource } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JWTService,
        $notifier: () => new Notifier(store),
        $api() {
          return createResource(this.$notifier);
        },
      },
    });
  },
};

Vue.use(plugins);
