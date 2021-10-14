<template>
  <div id="app">
    <AppLayout
      :isAuthorized="appState.isAuthorized"
      @userUnauthorize="setAuthorized(false)"
      :orderCost="appState.orderCost"
    >
      <router-view
        @setOrderCostInApp="setOrderCostInApp"
        @userAuthorize="setAuthorized(true)"
      />
    </AppLayout>
  </div>
</template>

<script>
import { LOCAL_STORAGE_APP_STATE } from "@/common/constants.js";
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  data() {
    return {
      appState: {
        isAuthorized: false,
        orderCost: 0,
      },
    };
  },

  created() {
    if (LOCAL_STORAGE_APP_STATE in localStorage) {
      let userDataSaved = JSON.parse(localStorage[LOCAL_STORAGE_APP_STATE]);
      this.appState.isAuthorized = userDataSaved.isAuthorized;
      this.appState.orderCost = userDataSaved.orderCost;
    } else {
      localStorage[LOCAL_STORAGE_APP_STATE] = JSON.stringify(this.appState);
    }
  },

  watch: {
    appState: {
      deep: true,
      handler(newState) {
        localStorage[LOCAL_STORAGE_APP_STATE] = JSON.stringify(newState);
      },
    },
  },

  methods: {
    setAuthorized(newState) {
      this.appState.isAuthorized = newState;

      if (!newState) {
        let routeNameForUnauthorized =
          this.$route.meta.routeNameForUnauthorized;
        if (!this.appState.isAuthorized && routeNameForUnauthorized !== null) {
          this.$router.push({ name: routeNameForUnauthorized });
        }
      }
    },

    setOrderCostInApp(argOrderCost) {
      this.appState.orderCost = argOrderCost;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
