<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingridients">
        <RadioButton
          :arrayData="sauce"
          nameInput="sauce"
          classesNameComponent="ingridients__sauce"
          classesNameLabel="radio ingridients__input"
          textIntro="Основной соус:"
          :isRadioClassVisuallyHidden="false"
          vuexActionName="Builder/updatePizzaBuilder"
          vuexDataType="foundation"
        />

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <!--li
              v-for="(ingredientsItem, indexIngredient) in ingredients"
              :key="ingredientsItem.code"
              class="ingridients__item"
            -->
            <li
              v-for="(ingredientsItem) in ingredients"
              :key="ingredientsItem.code"
              class="ingridients__item"
            >
              <AppDrag :transferData="ingredientsItem.code">
                <SelectorItem
                  :textComponent="ingredientsItem.name"
                  :codeComponent="ingredientsItem.code"
                />
              </AppDrag>

              <!--ItemCounter
                :counterValue="ingredientsItem.value"
                :nameInput="ingredientsItem.code"
                :indexInArray="indexIngredient"
                :counterChangeLimit="counterChangeLimit"
                vuexActionName="Builder/updatePizzaBuilder"
                vuexDataType="ingredients"
              /-->
              <ItemCounter
                counterType="ingredients"
                :counterValue="ingredientsItem.value"
                :nameInput="ingredientsItem.code"
                :counterChangeLimit="counterChangeLimit"
                vuexActionName="Builder/updatePizzaBuilder"
                vuexDataType="ingredients"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
import SelectorItem from "@/common/components/SelectorItem.vue";
import ItemCounter from "@/common/components/ItemCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";
import { INGREDIENT_COUNTER_LIMIT_MAX } from "@/common/constants.js";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    RadioButton,
    SelectorItem,
    ItemCounter,
    AppDrag,
  },

  data() {
    return {
      counterChangeLimit: {
        min: 0,
        max: INGREDIENT_COUNTER_LIMIT_MAX,
      },
    };
  },

  computed: {
    sauce() {
      return this.$store.getters["Builder/sauce"];
    },
    ingredients() {
      return this.$store.getters["Builder/ingredients"];
    },
  },
};
</script>

<style></style>
