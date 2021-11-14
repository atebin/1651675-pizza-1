<template>
  <section>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector />

          <BuilderSizeSelector />

          <BuilderIngredientsSelector />

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
                :value="pizzaName"
                @change="updatePizzaBuilderName($event.target.value)"
              />
            </label>

            <BuilderPizzaView />

            <BuilderPriceCounter />
          </div>
        </div>
      </form>
    </main>

    <router-view @userAuthorize="$emit('userAuthorize')" />
  </section>
</template>

<script>
import user from "@/static/user.json";

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
      sourceData: {
        user: {},
      },
    };
  },

  computed: {
    pizzaName: function () {
      return this.$store.getters["Builder/pizzaName"];
    },
    pizzaCost: function () {
      return this.$store.getters["Builder/pizzaCost"];
    },
  },

  created() {
    this.sourceData.user = user;
  },

  methods: {
    updatePizzaBuilderName(argNewName) {
      this.$store.dispatch("Builder/updatePizzaBuilderName", {
        value: argNewName,
      });
    },
  },
};
</script>

<style></style>
