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
import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  data: () => {
    return {
      localMapDough: {
        light: "small",
        large: "big",
      },
    };
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    classesFoundation: function () {
      let localDough = "big";

      if ("dough" in this.order.pizza.foundation) {
        if (this.order.pizza.foundation.dough in this.localMapDough) {
          localDough = this.localMapDough[this.order.pizza.foundation.dough];
        }
      }

      let localSauce = "tomato";
      if ("sauce" in this.order.pizza.foundation) {
        localSauce = this.order.pizza.foundation.sauce;
      }

      return `pizza pizza--foundation--${localDough}-${localSauce}`;
    },

    localNormalizeIngredients: function () {
      let result = {};

      for (let codeIngredient in this.order.pizza.ingredients) {
        for (
          let countIngredient = this.order.pizza.ingredients[codeIngredient];
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
      }

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
      this.$emit("dropIngredient", addIngredient);
    },
  },
};
</script>

<style></style>
