<template>
  <div id="app">
    <router-view
      :isAuthorized="appState.isAuthorized"
      :setAuthorized="setAuthorized"
      :orderCost="appState.orderCost"
      :setOrderCost="setOrderCost"
    />
  </div>
</template>

<script>
const LOCAL_STORAGE_APP_STATE = "_1651675_app_state";
//const LOCAL_STORAGE_IS_AUTHORIZED = "_1651675_app_state";

export default {
  name: "App",

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
      localStorage[LOCAL_STORAGE_APP_STATE] = JSON.stringify(this.isAuthorized);
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

    setOrderCost(newValue) {
      this.appState.orderCost = newValue;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
