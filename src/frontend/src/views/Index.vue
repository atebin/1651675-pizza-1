<template>
  <section>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :dough="sourceData.foundation.dough"
            @updateOrder="updateOrder"
          />

          <BuilderSizeSelector
            :diameter="sourceData.foundation.diameter"
            @updateOrder="updateOrder"
          />

          <BuilderIngredientsSelector
            :sauce="sourceData.foundation.sauce"
            :ingredients="sourceData.ingredients"
            :order="order"
            @updateOrder="updateOrder"
          />

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
                v-model="order.pizzaName"
              />
            </label>

            <BuilderPizzaView :order="order" @dropIngredient="dropIngredient" />

            <BuilderPriceCounter
              :orderCost="order.orderCost"
              :orderReady="order.orderReady"
            />
          </div>
        </div>
      </form>
    </main>

    <router-view :is="componentModal" @userAuthorize="$emit('userAuthorize')" />
  </section>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";

export default {
  name: "Index",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  data() {
    return {
    };
  },

  props: {
    sourceData: {
      type: Object,
      required: true,
    },

    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    componentModal: function () {
      let componentName = "-";

      if ("component_children" in this.$route.meta) {
        componentName = this.$route.meta.component_children;
      } else {
        return null;
      }

      return () => import(`./${componentName}.vue`);
    },
  },

  methods: {
    updateOrder(newValue) {
      this.$emit("updateOrder", newValue);
    },

    dropIngredient(addIngredient) {
      this.$emit("dropIngredient", addIngredient);
    },
  },
};
</script>

<style></style>
