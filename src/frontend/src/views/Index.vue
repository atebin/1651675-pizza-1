<template>
  <section>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  v-for="doughItem in dough"
                  :key="doughItem.code"
                  :class="'dough__input dough__input--' + doughItem.code"
                >
                  <input
                    v-if="doughItem.isChecked"
                    type="radio"
                    name="dought"
                    :value="doughItem.code"
                    class="visually-hidden"
                    checked
                  />
                  <input
                    v-if="!doughItem.isChecked"
                    type="radio"
                    name="dought"
                    :value="doughItem.code"
                    class="visually-hidden"
                  />
                  <b>{{ doughItem.name }}</b>
                  <span>{{ doughItem.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  v-for="sizesItem in sizes"
                  :key="sizesItem.code"
                  :class="'diameter__input diameter__input--' + sizesItem.code"
                >
                  <input
                    v-if="!sizesItem.isChecked"
                    type="radio"
                    name="diameter"
                    :value="sizesItem.code"
                    class="visually-hidden"
                  />
                  <input
                    v-if="sizesItem.isChecked"
                    type="radio"
                    name="diameter"
                    :value="sizesItem.code"
                    class="visually-hidden"
                    checked
                  />
                  <span>{{ sizesItem.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingridients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингридиенты
              </h2>

              <div class="sheet__content ingridients">
                <div class="ingridients__sauce">
                  <p>Основной соус:</p>

                  <label
                    v-for="saucesItem in sauces"
                    :key="saucesItem.code"
                    class="radio ingridients__input"
                  >
                    <input
                      v-if="saucesItem.isChecked"
                      type="radio"
                      name="sauce"
                      :value="saucesItem.code"
                      checked
                    />
                    <input
                      v-if="!saucesItem.isChecked"
                      type="radio"
                      name="sauce"
                      :value="saucesItem.code"
                    />
                    <span>{{ saucesItem.name }}</span>
                  </label>
                </div>

                <div class="ingridients__filling">
                  <p>Начинка:</p>

                  <ul class="ingridients__list">
                    <li
                      v-for="ingredientsItem in ingredients"
                      :key="ingredientsItem.code"
                      class="ingridients__item"
                    >
                      <span :class="'filling filling--' + ingredientsItem.code">
                        {{ ingredientsItem.name }}
                      </span>

                      <div class="counter counter--orange ingridients__counter">
                        <!--button
                          type="button"
                          :class="
                            counter__button
                            counter__button--disabled
                            counter__button--minus
                          "
                        -->
                        <button
                          type="button"
                          :class="classesButtonMinus(ingredientsItem.value)"
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          v-model="ingredientsItem.value"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>

                    <!--
                      <li class="ingridients__item">
                        <span class="filling filling--mushrooms">Грибы</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--cheddar">Чеддер</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--salami">Салями</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--ham">Ветчина</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--ananas">Ананас</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--bacon">Бекон</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--onion">Лук</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--chile">Чили</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--jalapeno">Халапеньо</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--olives">Маслины</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--tomatoes">Томаты</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--salmon">Лосось</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--mozzarella">Моцарелла</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--parmesan">Пармезан</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                      <li class="ingridients__item">
                        <span class="filling filling--blue_cheese">Блю чиз</span>

                        <div class="counter counter--orange ingridients__counter">
                          <button
                            type="button"
                            class="
                              counter__button
                              counter__button--disabled
                              counter__button--minus
                            "
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                    -->
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button button--disabled" disabled>
                Готовьте!
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </section>
</template>

<script>
import pizza from "@/static/pizza.json";
import misc from "@/static/misc.json";
import user from "@/static/user.json";
import { normalizeDough } from "@/common/normalizeDough.js";
import { normalizeSizes } from "@/common/normalizeSizes.js";
import { normalizeSauces } from "@/common/normalizeSauces.js";
import { normalizeIngredients } from "@/common/normalizeIngredients.js";

export default {
  name: "Index",

  data() {
    return {
      dough: normalizeDough(pizza.dough),
      sizes: normalizeSizes(pizza.sizes),
      sauces: normalizeSauces(pizza.sauces),
      ingredients: normalizeIngredients(pizza.ingredients),
      misc,
      user,
    };
  },

  methods: {
    classesButtonMinus(value) {
      return {
        counter__button: true,
        "counter__button--disabled": value === 0,
        "counter__button--minus": true,
      };
    },
  },
};
</script>

<style></style>
