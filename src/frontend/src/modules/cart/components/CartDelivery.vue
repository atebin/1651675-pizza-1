<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          v-model="localState.selectedAdressKey"
        >
          <option
            v-for="(adress, adressKey) in adressInfo"
            :key="adressKey"
            :value="adressKey"
          >
            {{ adress.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="currentPhone"
          @change="editPhone($event.target.value)"
        />
      </label>

      <div class="cart-form__address">
        <span class="cart-form__label" v-if="selectedAdressInfo.adressShow">
          Новый адрес:
        </span>

        <div class="cart-form__input" v-if="selectedAdressInfo.adressShow">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :disabled="!selectedAdressInfo.adressActive"
              :value="currentAdress.street"
              @change="editAdress('street', $event.target.value)"
            />
          </label>
        </div>

        <div
          class="cart-form__input cart-form__input--small"
          v-if="selectedAdressInfo.adressShow"
        >
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              :disabled="!selectedAdressInfo.adressActive"
              :value="currentAdress.house"
              @change="editAdress('house', $event.target.value)"
            />
          </label>
        </div>

        <div
          class="cart-form__input cart-form__input--small"
          v-if="selectedAdressInfo.adressShow"
        >
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :disabled="!selectedAdressInfo.adressActive"
              :value="currentAdress.flat"
              @change="editAdress('flat', $event.target.value)"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SELECTED_ADRESS_KEY_DEFAULT = 1;

export default {
  name: "CartDelivery",

  data() {
    return {
      localState: {
        selectedAdressKey: SELECTED_ADRESS_KEY_DEFAULT,
      },
      currentPhone: "",
      currentAdress: {},
    };
  },

  computed: {
    isAuthorized: function () {
      return this.$store.getters["Auth/isAuthorized"];
    },

    phone: function () {
      return this.$store.getters["Cart/phone"];
    },

    listUserAdresses: function () {
      return this.$store.getters["Auth/listUserAdresses"];
    },

    adressInfo: function () {
      return this.$store.getters["Auth/adressInfo"];
    },

    selectedAdressInfo: function () {
      let index = this.localState.selectedAdressKey;

      if (index >= this.adressInfo.length) {
        index = SELECTED_ADRESS_KEY_DEFAULT;
      }
      return this.adressInfo[index];
    },

    userAdress: function () {
      let adress = this.$store.getters["Auth/getAdressTemplate"];
      if ("indexInAdressList" in this.selectedAdressInfo) {
        let index = this.selectedAdressInfo.indexInAdressList;
        if (index !== null) {
          for (let item in adress) {
            if (item in this.listUserAdresses[index]) {
              this.$set(adress, item, this.listUserAdresses[index][item]);
            }
          }
        } else {
          adress = this.$store.getters["Cart/getAdress"];
        }
      }

      return adress;
    },
  },

  watch: {
    phone: {
      immediate: true,
      deep: true,
      handler: function (newPhone) {
        let phone = "";
        if (newPhone.enteredPhone === "") {
          phone = newPhone.defaultPhone;
        } else {
          phone = newPhone.enteredPhone;

          if (
            !this.isAuthorized &&
            phone === newPhone.tempPhone &&
            phone !== ""
          ) {
            phone = "";
            this.$store.dispatch("Auth/clearTempPhone");
          }
        }

        this.currentPhone = phone;
        this.editPhone(phone);
      },
    },
    userAdress: {
      immediate: true,
      handler: function (newAdress) {
        for (let item in newAdress) {
          this.$set(this.currentAdress, item, newAdress[item]);
        }
      },
    },
    adressInfo: {
      deep: true,
      handler: function () {
        this.$set(
          this.localState,
          "selectedAdressKey",
          SELECTED_ADRESS_KEY_DEFAULT
        );
      },
    },
    isAuthorized: function (newValue) {
      if (
        !newValue &&
        this.localState.selectedAdressKey !== SELECTED_ADRESS_KEY_DEFAULT
      ) {
        this.$store.dispatch("Cart/clearAdress");
      }
    },
  },

  methods: {
    editPhone(newPhone) {
      this.$store.dispatch("Cart/editPhone", newPhone);
    },

    editAdress(argItem, argValue) {
      let newAdress = JSON.parse(JSON.stringify(this.currentAdress));
      if (argItem in newAdress) {
        newAdress[argItem] = argValue;
      }
      this.$store.dispatch("Cart/editAdress", newAdress);
    },
  },
};
</script>

<style scoped></style>
