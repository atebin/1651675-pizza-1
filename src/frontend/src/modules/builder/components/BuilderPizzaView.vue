<template>
  <AppDrop @drop="dropIngredient">
    <div class="content__constructor">
      <div :class="classesFoundation">
        <div class="pizza__wrapper">
          <div
            v-for="(ingredientsItem, key) in localNormalizeIngredients"
            :key="key"
            :class="
              classesIngredientsItem(
                ingredientsItem.code,
                ingredientsItem.count
              )
            "
          ></div>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import { INGREDIENT_COUNTER_LIMIT_MAX } from "@/common/constants.js";
import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  data() {
    return {
      localMapDough: {
        light: "small",
        large: "big",
      },
    };
  },

  computed: {
    classesFoundation: function () {
      ////////////////////////////////////////////////////////////////
      let localDough =
        this.$store.getters["Builder/dough"].filter((item) => {
          return item.isChecked;
        })[0].code || "large";

      if (localDough in this.localMapDough) {
        localDough = this.localMapDough[localDough];
      }

      ////////////////////////////////////////////////////////////////
      let localSauce =
        this.$store.getters["Builder/sauce"].filter((item) => {
          return item.isChecked;
        })[0].code || "tomato";

      return `pizza pizza--foundation--${localDough}-${localSauce}`;
    },

    localNormalizeIngredients: function () {
      let result = {};

      let ingredients = this.$store.getters["Builder/ingredients"];

      ingredients.forEach((item) => {
        let codeIngredient = item.code;

        for (
          let countIngredient = item.value;
          countIngredient >= 1;
          countIngredient--
        ) {
          let key = `${codeIngredient}_${countIngredient}`;
          let value = {
            code: codeIngredient,
            count: countIngredient,
          };
          this.$set(result, key, value);
        }
      });

      return result;
    },
  },

  methods: {
    classesIngredientsItem(code, count) {
      return [
        "pizza__filling",
        `pizza__filling pizza__filling--${code}`,
        {
          "pizza__filling--second": count === 2,
          "pizza__filling--third": count === 3,
        },
      ];
    },

    dropIngredient(addIngredient) {
      let itemIngredient = this.$store.getters["Builder/ingredients"].filter(
        (item) => {
          return item.code === addIngredient;
        }
      );

      if (itemIngredient.length < 1) {
        console.error(
          "Ошибка в функции 'dropIngredient': vuex не нашел данные по перетаскиваемому ингредиенту."
        );
        return false;
      }

      let newValue = itemIngredient[0].value + 1;

      if (newValue <= INGREDIENT_COUNTER_LIMIT_MAX) {
        this.$store.dispatch("Builder/updatePizzaBuilder", {
          type: "ingredients",
          name: addIngredient,
          value: newValue,
        });
      }
    },
  },
};
</script>

<style></style>
