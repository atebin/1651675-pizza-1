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
          @updateOrder="updateOrder"
        />

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              v-for="(ingredientsItem, indexIngredient) in ingredients"
              :key="ingredientsItem.code"
              class="ingridients__item"
            >
              <AppDrag :transferData="ingredientsItem.code">
                <SelectorItem
                  :textComponent="ingredientsItem.name"
                  :codeComponent="ingredientsItem.code"
                />
              </AppDrag>

              <ItemCounter
                :counterValue="ingredientsItem.value"
                :nameInput="ingredientsItem.code"
                :indexInArray="indexIngredient"
                :orderIngredients="order.pizza.ingredients"
                @updateOrder="updateOrder"
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

export default {
  name: "BuilderIngredientsSelector",

  components: {
    RadioButton,
    SelectorItem,
    ItemCounter,
    AppDrag,
  },

  props: {
    sauce: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    order: {
      type: Object,
      required: true,
    },
  },

  methods: {
    updateOrder(newValue) {
      this.$emit("updateOrder", newValue);
    },
  },
};
</script>

<style></style>
